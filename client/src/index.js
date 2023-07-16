import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { AppProvider } from './context/context'
import {BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Router>
    <App />
    </Router>
  </AppProvider>,
)
