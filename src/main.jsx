import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import dashboard from "./Dashboard/dashboard.html"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*  <div dangerouslySetInnerHTML={{__html: dashboard}} />*/}
  </StrictMode>,
)
