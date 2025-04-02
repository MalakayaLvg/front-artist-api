import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from "./components/LoginSignup.jsx";
import About from "./pages/About.jsx";
import NoteFoundPage from "./pages/NoteFoundPage.jsx";
import Artist from "./pages/Artist.jsx";
import Artists from "./pages/Artists.jsx";

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
                element: <LoginSignup />
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
      <RouterProvider router={router} />
  </StrictMode>,
)
