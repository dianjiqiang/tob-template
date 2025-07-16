import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "assets/css/reset.less"
import "assets/css/common.less"
import ThemeProvider from "components/ThemeProvider"
import { BrowserRouter } from "react-router-dom"
import App from "@/App.tsx"
import "@/utils/optimizeEventListeners"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
