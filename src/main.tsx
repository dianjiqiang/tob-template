import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "assets/css/reset.css"
import "assets/css/common.css"
import ThemeProvider from "context/ThemeContext";
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
