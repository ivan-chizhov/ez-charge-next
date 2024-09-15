import React from 'react'
import ReactDOMClient from 'react-dom/client'
import App from './App'
import './serviceWorkerRegistration'

import './index.css'
import '@fontsource-variable/roboto-flex/standard.css'
import 'material-icons/iconfont/material-icons.css'

const container = document.getElementById('app')
const root = ReactDOMClient.createRoot(container)
root.render(<App />)
