import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import NoteFoundPage from "./pages/NoteFoundPage.jsx";
import Artist from "./pages/Artist.jsx";
import Artists from "./pages/Artists.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Artists />
            },
            {
                path: "artist/:id",
                element: <Artist />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "about",
                element: <About />
            }
        ],
        errorElement: <NoteFoundPage />
    }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
)
