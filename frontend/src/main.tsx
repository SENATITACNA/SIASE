import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.tsx'

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)