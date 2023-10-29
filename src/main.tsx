import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Lobby from './pages/Lobby'
import Join from './pages/Join'
import Play from './pages/Play'

const router = createBrowserRouter([
  { path: '/', element: <Lobby /> },
  { path: '/play/:code', element: <Play /> },
  { path: '/join', element: <Join /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
