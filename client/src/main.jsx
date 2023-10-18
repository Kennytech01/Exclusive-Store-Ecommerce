import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
// import { ProductProvider } from './context/productContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <ProductProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  // </ProductProvider>
)
