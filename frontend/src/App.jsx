import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Page/HomePage.jsx'
import DeployProject from './Page/DeployProject.jsx'
import RootLayout from './Page/RootLayout.jsx'
import {Provider} from 'react-redux';
import store from "./store/store.js";
import SelectProject from "./Page/SelectProject.jsx"
import NotFound from "./Page/NotFound.jsx";

const router = createBrowserRouter([
  { path:'/', 
    element: <RootLayout />,
    children: [
      { index:true, element: <HomePage /> },
      { path:'/select-project', element: <SelectProject /> },
      { path:'/deploy-project/:id', element: <DeployProject /> },
      { path:'/*', element: <NotFound /> },
    ]
  }
])

export default function App(){

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>  
  )

}