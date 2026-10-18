import { motion } from 'motion/react';

// Isometric line illustrations for the three process steps: white hairlines on dark fills, one
// yellow accent each, and a little motion. Drawn on a 260 x 180 canvas.

const YELLOW = '#F6C744';
const LINE = 'rgba(255,255,255,0.55)';
const FAINT = 'rgba(255,255,255,0.22)';
const TOP = '#343434';
const LEFT = '#262626';
const RIGHT = '#2d2d2d';

// Isometric projection: x runs down-right, y runs down-left, z runs up
const COS = Math.cos(Math.PI / 6);
function makeIso(ox, oy) {
  return (x, y, z = 0) => [ox + (x - y) * COS, oy + (x + y) * 0.5 - z];
}
const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function Box({ iso, x, y, z = 0, w, d, h, top = TOP, stroke = LINE, children }) {
  const t = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const front = [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const side = [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)];
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(front)} fill={LEFT} stroke={stroke} strokeWidth="1" />
      <polygon points={pts(side)} fill={RIGHT} stroke={stroke} strokeWidth="1" />
      <polygon points={pts(t)} fill={top} stroke={stroke} strokeWidth="1" />
      {children}
    </g>
  );
}

// A vertical cylinder standing on (x, y, z)
function Cylinder({ iso, x, y, z = 0, r, h, fill = LEFT, top = TOP, stroke = LINE }) {
  const [cx, cyBottom] = iso(x, y, z);
  const cyTop = cyBottom - h;
  const rx = r * 1.2247;
  const ry = r * 0.7071;
  return (
    <g>
      <path
        d={`M${cx - rx} ${cyTop} L${cx - rx} ${cyBottom} A${rx} ${ry} 0 0 0 ${cx + rx} ${cyBottom} L${cx + rx} ${cyTop} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
      <ellipse cx={cx} cy={cyTop} rx={rx} ry={ry} fill={top} stroke={stroke} strokeWidth="1" />
    </g>
  );
}

function Canvas({ label, children }) {
  return (
    <svg viewBox="0 0 260 180" className="h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

const float = (delay = 0, lift = 6) => ({
  animate: { y: [0, -lift, 0] },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay },
});

// --- 01 Blueprint: layered sheets, the top one drawn up as a plan with a yellow node ---
export function BlueprintIllustration() {
  const iso = makeIso(120, 50);
  const W = 120;
  const D = 92;
  const sheet = (z) => [iso(0, 0, z), iso(W, 0, z), iso(W, D, z), iso(0, D, z)];
  return (
    <Canvas label="Layered blueprint sheets">
      {/* Shadow on the ground */}
      <polygon points={pts(sheet(-6))} fill="rgba(0,0,0,0.25)" />
      <Box iso={iso} x={0} y={0} z={0} w={W} d={D} h={4} />
      <motion.g {...float(0.4, 4)}>
        <Box iso={iso} x={0} y={0} z={14} w={W} d={D} h={4} />
      </motion.g>
      <motion.g {...float(0, 8)}>
        <Box iso={iso} x={0} y={0} z={28} w={W} d={D} h={4}>
          {/* Plan drawn on the top sheet */}
          {[24, 48, 72, 96].map((gx) => (
            <line key={`gx${gx}`} x1={iso(gx, 0, 32)[0]} y1={iso(gx, 0, 32)[1]} x2={iso(gx, D, 32)[0]} y2={iso(gx, D, 32)[1]} stroke={FAINT} strokeWidth="0.75" />
          ))}
          {[23, 46, 69].map((gy) => (
            <line key={`gy${gy}`} x1={iso(0, gy, 32)[0]} y1={iso(0, gy, 32)[1]} x2={iso(W, gy, 32)[0]} y2={iso(W, gy, 32)[1]} stroke={FAINT} strokeWidth="0.75" />
          ))}
          <polygon points={pts([iso(14, 14, 32), iso(62, 14, 32), iso(62, 50, 32), iso(14, 50, 32)])} fill="none" stroke={LINE} strokeWidth="1.2" strokeDasharray="3 3" />
          <polyline points={pts([iso(62, 32, 32), iso(86, 32, 32), iso(86, 70, 32)])} fill="none" stroke={LINE} strokeWidth="1.2" />
          <polygon points={pts([iso(78, 62, 32), iso(96, 62, 32), iso(96, 80, 32), iso(78, 80, 32)])} fill={YELLOW} stroke={YELLOW} strokeWidth="1" />
          <motion.circle
            cx={iso(38, 32, 32)[0]}
            cy={iso(38, 32, 32)[1]}
            r="3"
            fill={YELLOW}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Box>
      </motion.g>
    </Canvas>
  );
}

// --- 02 Connect: a board of tools wired into the yellow agent block, data moving between them ---
const BLOCKS = [
  { x: 8, y: 10, w: 26, d: 26, h: 20 },
  { x: 112, y: 8, w: 26, d: 22, h: 14 },
  { x: 10, y: 74, w: 30, d: 24, h: 12 },
  { x: 108, y: 70, w: 30, d: 30, h: 24 },
];
const AGENT = { x: 58, y: 40, w: 32, d: 30, h: 30 };

export function ConnectIllustration() {
  const iso = makeIso(118, 38);
  const BW = 150;
  const BD = 110;
  const BH = 6;
  const hub = [AGENT.x + AGENT.w / 2, AGENT.y + AGENT.d / 2];
  const wires = BLOCKS.map((b) => [[b.x + b.w / 2, b.y + b.d / 2], hub]);
  return (
    <Canvas label="Tools wired into the AI agent">
      <polygon points={pts([iso(0, 0, -8), iso(BW, 0, -8), iso(BW, BD, -8), iso(0, BD, -8)])} fill="rgba(0,0,0,0.25)" />
      <Box iso={iso} x={0} y={0} z={0} w={BW} d={BD} h={BH} />

      {/* Wires on the board, with packets running to the agent */}
      {wires.map(([[ax, ay], [bx, by]], idx) => {
        const [x1, y1] = iso(ax, ay, BH);
        const [x2, y2] = iso(bx, by, BH);
        return (
          <g key={idx}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINE} strokeWidth="1" strokeDasharray="2 3" />
            <motion.circle
              r="2.4"
              fill={YELLOW}
              initial={{ cx: x1, cy: y1, opacity: 0 }}
              animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8, delay: idx * 0.6, ease: 'easeInOut' }}
            />
          </g>
        );
      })}

      {/* Back blocks first so nearer ones overlap them */}
      {[BLOCKS[0], BLOCKS[1]].map((b, idx) => <Box key={`b${idx}`} iso={iso} {...b} z={BH} />)}
      <motion.g {...float(0, 4)}>
        <Box iso={iso} {...AGENT} z={BH} top={YELLOW} stroke={YELLOW}>
          <polygon
            points={pts([iso(AGENT.x + 8, AGENT.y + 8, BH + AGENT.h), iso(AGENT.x + 24, AGENT.y + 8, BH + AGENT.h), iso(AGENT.x + 24, AGENT.y + 22, BH + AGENT.h), iso(AGENT.x + 8, AGENT.y + 22, BH + AGENT.h)])}
            fill="none"
            stroke="#171717"
            strokeWidth="1.2"
          />
        </Box>
      </motion.g>
      {[BLOCKS[2], BLOCKS[3]].map((b, idx) => <Box key={`f${idx}`} iso={iso} {...b} z={BH} />)}
    </Canvas>
  );
}

// --- 03 Go live: a beacon on a platform, sending out signal ---
export function LaunchIllustration() {
  const iso = makeIso(150, 72);
  const base = [60, 60];
  const [lx, ly] = iso(base[0], base[1], 104);
  return (
    <Canvas label="A beacon sending out signal">
      <ellipse cx={iso(...base, -6)[0]} cy={iso(...base, -6)[1]} rx={52 * 1.2247} ry={52 * 0.7071} fill="rgba(0,0,0,0.25)" />
      <Cylinder iso={iso} x={base[0]} y={base[1]} z={0} r={48} h={8} />
      <Cylinder iso={iso} x={base[0]} y={base[1]} z={8} r={32} h={8} />
      {/* Tower */}
      <Cylinder iso={iso} x={base[0]} y={base[1]} z={16} r={13} h={74} />
      {[34, 52, 70].map((z) => {
        const [cx, cy] = iso(base[0], base[1], 16 + z);
        return <path key={z} d={`M${cx - 15.9} ${cy} A15.9 9.2 0 0 0 ${cx + 15.9} ${cy}`} fill="none" stroke={FAINT} strokeWidth="1" />;
      })}
      <Cylinder iso={iso} x={base[0]} y={base[1]} z={90} r={9} h={8} top="#3d3d3d" />
      <polygon points={pts([[lx - 9, ly + 2], [lx, ly - 14], [lx + 9, ly + 2]])} fill={TOP} stroke={LINE} strokeWidth="1" strokeLinejoin="round" />

      {/* Signal beams sweeping out to the left */}
      {[
        [-110, -34],
        [-118, -6],
        [-104, 22],
      ].map(([dx, dy], idx) => (
        <motion.line
          key={idx}
          x1={lx}
          y1={ly - 2}
          x2={lx + dx}
          y2={ly - 2 + dy}
          stroke={YELLOW}
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeLinecap="round"
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
        />
      ))}
      <motion.circle
        cx={lx}
        cy={ly - 2}
        r="5"
        fill={YELLOW}
        animate={{ opacity: [0.6, 1, 0.6], r: [4.5, 6, 4.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </Canvas>
  );
}
