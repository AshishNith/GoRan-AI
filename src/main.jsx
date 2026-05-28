import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.jsx'

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (gaId && gaId !== 'G-XXXXXXXXXX') {
  ReactGA.initialize(gaId)
} else {
  // Initialize in testMode if VITE_GA_MEASUREMENT_ID is not configured
  ReactGA.initialize('G-XXXXXXXXXX', { testMode: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

