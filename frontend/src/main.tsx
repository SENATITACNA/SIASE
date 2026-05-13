import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/lista.css'
import App from './components/ListaEstudiantes.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
