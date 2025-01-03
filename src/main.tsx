import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "assets/css/reset.css"
import "assets/css/common.css"
import ThemeProvider from "context/ThemeContext";
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
  </StrictMode>,
)
