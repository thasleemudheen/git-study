import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistore } from './reduxStore/store.js'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate persistor={persistore}>
      <App />
      </PersistGate>
    </Provider>
  
)
