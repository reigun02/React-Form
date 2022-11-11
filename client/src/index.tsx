import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from './mui/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ThemeProvider>
  // </React.StrictMode>
)
