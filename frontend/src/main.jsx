import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/general.css'
import './css/home.css'
import './css/nav.css'
import './css/account.css'
import './css/timeline.css'
import './css/dashboard.css'
import './css/myprofile.css'
import './css/mytimelines.css'
import './css/newtimeline.css';
import './css/about.css';
import './css/contact.css';
import './css/components.css';
import './css/TimelineMark.css'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
