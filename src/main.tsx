import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "assets/css/reset.less"
import "assets/css/common.less"
import ThemeProvider from "context/ThemeContext"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "@/store"
import App from "@/App.tsx"
import "@/utils/optimizeEventListeners"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
