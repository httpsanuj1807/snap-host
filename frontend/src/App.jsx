import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Page/HomePage.jsx'
import RootLayout from './Page/RootLayout.jsx'

const router = createBrowserRouter([
  { path:'/', 
    element: <RootLayout />,
    children: [
      { path:'/', element: <HomePage /> },      
    ]
  }
])

export default function App(){

  return (
    
    <RouterProvider router={router} />

  )

}