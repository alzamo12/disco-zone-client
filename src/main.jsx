import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/Router.jsx'
import { RouterProvider } from 'react-router'
import AnnouncementProvider from './providers/AnnouncementProver.jsx'
// import { AnnouncementProvider } from './providers/AnnouncementProver.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnnouncementProvider>
      <RouterProvider router={router} />
    </AnnouncementProvider>
  </StrictMode>,
)
