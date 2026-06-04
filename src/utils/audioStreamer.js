/**
 * Helper to calculate root-mean-square (RMS) volume of float32 audio samples.
 */
function calculateRMS(float32Array) {
  let sum = 0;
  for (let i = 0; i < float32Array.length; i++) {
    sum += float32Array[i] * float32Array[i];
  }
  return Math.sqrt(sum / Math.max(1, float32Array.length));
}

/**
 * Resample Float32 audio buffer from standard input rate to target rate.
 */
function downsample(buffer, fromRate, toRate) {
  if (fromRate === toRate) {
    return buffer;
  }
  const sampleRateRatio = fromRate / toRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetInput = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0, count = 0;
    for (let i = offsetInput; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetInput = nextOffsetBuffer;
  }
  return result;
}

/**
 * Convert Float32Array to signed 16-bit little-endian PCM byte array.
 */
function floatTo16BitPCM(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return new Uint8Array(buffer);
}

/**
 * Decode base64 PCM back to Float32.
 */
function base64ToFloat32(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const view = new DataView(bytes.buffer);
  const float32 = new Float32Array(len / 2);
  for (let i = 0; i < float32.length; i++) {
    const int16 = view.getInt16(i * 2, true); // true = little-endian
    float32[i] = int16 / (int16 < 0 ? 0x8000 : 0x7FFF);
  }
  return float32;
}

/**
 * Base64 encode an ArrayBuffer.
 */
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export class AudioStreamer {
  constructor() {
    this.audioContext = null;
    this.micStream = null;
    this.workletNode = null;
    this.nextPlayTime = 0;
    this.recording = false;
    this.muted = false;
    this.playVolumeCallback = null;
    this.micVolumeCallback = null;
    this.onAudioChunk = null;
    this.gainNode = null;
  }

  async init() {
    if (this.audioContext) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContextClass();
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  async startRecording(onAudioChunk, onMicVolumeChange) {
    if (this.recording) return;
    await this.init();
    this.onAudioChunk = onAudioChunk;
    this.micVolumeCallback = onMicVolumeChange;

    try {
      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      
      const source = this.audioContext.createMediaStreamSource(this.micStream);
      
      // Inline AudioWorklet definition
      const workletCode = `
        class AudioProcessor extends AudioWorkletProcessor {
          process(inputs, outputs, parameters) {
            const input = inputs[0];
            if (input && input[0]) {
              this.port.postMessage(input[0]);
            }
            return true;
          }
        }
        registerProcessor('audio-processor', AudioProcessor);
      `;
      const blob = new Blob([workletCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      
      try {
        await this.audioContext.audioWorklet.addModule(url);
        this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-processor');
      } catch (err) {
        console.warn("AudioWorklet not supported or failed to load. Falling back to ScriptProcessorNode", err);
        // Fallback to deprecated but widely supported ScriptProcessorNode
        this.workletNode = this.audioContext.createScriptProcessor(2048, 1, 1);
        this.workletNode.onaudioprocess = (e) => {
          if (!this.recording || this.muted) return;
          const inputData = e.inputBuffer.getChannelData(0);
          this.processMicData(new Float32Array(inputData));
        };
        source.connect(this.workletNode);
        this.workletNode.connect(this.audioContext.destination);
        this.recording = true;
        return;
      }
      
      this.workletNode.port.onmessage = (event) => {
        if (!this.recording || this.muted) return;
        this.processMicData(event.data);
      };
      
      source.connect(this.workletNode);
      this.recording = true;
    } catch (err) {
      console.error("Failed to start recording:", err);
      throw err;
    }
  }

  processMicData(float32Data) {
    // 1. Calculate RMS volume for visualizer
    if (this.micVolumeCallback) {
      const rms = calculateRMS(float32Data);
      const volume = Math.min(100, Math.round(rms * 400));
      this.micVolumeCallback(volume);
    }

    // 2. Downsample from native rate to 16000Hz
    const nativeSampleRate = this.audioContext.sampleRate;
    const resampled = downsample(float32Data, nativeSampleRate, 16000);

    // 3. Convert Float32Array to Int16 PCM bytes
    const pcmData = floatTo16BitPCM(resampled);

    // 4. Base64 encode and send to socket handler
    const base64 = arrayBufferToBase64(pcmData.buffer);
    if (this.onAudioChunk) {
      this.onAudioChunk(base64);
    }
  }

  stopRecording() {
    this.recording = false;
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
    if (this.workletNode) {
      this.workletNode.disconnect();
      this.workletNode = null;
    }
    if (this.micVolumeCallback) {
      this.micVolumeCallback(0);
    }
  }

  setMute(isMuted) {
    this.muted = isMuted;
  }

  startPlayback(onPlaybackVolumeChange) {
    this.playVolumeCallback = onPlaybackVolumeChange;
    this.nextPlayTime = 0;
  }

  stopPlayback() {
    this.playVolumeCallback = null;
    this.nextPlayTime = 0;
  }

  playChunk(base64Data) {
    if (!this.audioContext) return;
    
    // Decode base64 24kHz PCM back to Float32
    const float32Data = base64ToFloat32(base64Data);
    
    // Calculate RMS volume for agent visualizer
    if (this.playVolumeCallback) {
      const rms = calculateRMS(float32Data);
      const volume = Math.min(100, Math.round(rms * 400));
      this.playVolumeCallback(volume);
    }

    // Create audio buffer at 24000Hz
    const buffer = this.audioContext.createBuffer(1, float32Data.length, 24000);
    buffer.copyToChannel(float32Data, 0);

    // Schedule buffer
    const sourceNode = this.audioContext.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(this.gainNode);

    const currentTime = this.audioContext.currentTime;
    let startTime = this.nextPlayTime;
    if (startTime < currentTime) {
      // Jitter buffer cushion
      startTime = currentTime + 0.05;
    }

    sourceNode.start(startTime);
    this.nextPlayTime = startTime + buffer.duration;
  }

  clearPlayback() {
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch (e) {}
      this.gainNode = null;
    }
    if (this.audioContext) {
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    }
    this.nextPlayTime = 0;
  }

  async close() {
    this.stopRecording();
    this.stopPlayback();
    if (this.audioContext) {
      try {
        await this.audioContext.close();
      } catch (err) {
        console.error("Error closing AudioContext:", err);
      }
      this.audioContext = null;
    }
  }
}
