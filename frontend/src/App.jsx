import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Page/HomePage.jsx'
import ConfigurePage from './Page/ConfigurePage.jsx'
import RootLayout from './Page/RootLayout.jsx'

const router = createBrowserRouter([
  { path:'/', 
    element: <RootLayout />,
    children: [
      { index:true, element: <HomePage /> },
      { path:'/configure-project', element: <ConfigurePage /> },
    ]
  }
])

export default function App(){

  return (
    
    <RouterProvider router={router} />

  )

}