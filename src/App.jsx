import React from 'react'
import './App.css'
import Home from './pages/Home'

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Home/>
    ),
  },
  {
    path: "/login",
    element: (<LoginPage/>),
  },
  {
    path: "/signup",
    element: (<SignUpPage/>),
  },
]);


const App = () => {
  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App


