import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
const App = React.lazy(() => import('./App'))
//increase the speed (load first text then load heavy data)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
