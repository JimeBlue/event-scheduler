import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import EventsProvider from './context/EventsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* AuthProvider is outermost: it owns the token, and anything inside
          (EventsProvider, every page, the navbar, the route guard) can read
          it via useAuth(). A provider can only see contexts ABOVE it. */}
      <AuthProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
