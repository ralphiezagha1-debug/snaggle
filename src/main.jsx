import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { CreditsProvider } from './state/credits';
import { AuthProvider } from './state/auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CreditsProvider>
        <App />
      </CreditsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
