import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, } from "react-router-dom";
import { router } from './router/index.tsx';
import { AuthProvider } from './context/authContext.tsx';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
)
