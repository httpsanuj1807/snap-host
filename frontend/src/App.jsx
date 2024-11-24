import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './Page/HomePage.jsx'
import DeployProject from './Page/DeployProject.jsx'
import RootLayout from './Page/RootLayout.jsx'
import {Provider} from 'react-redux';
import store from "./store/store.js";
import SelectProject from "./Page/SelectProject.jsx"
import NotFound from "./Page/NotFound.jsx";
import Contact from "./Page/Contact.jsx";
import Support from "./Page/Support.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateComponent.jsx";

const router = createBrowserRouter([
  { path:'/', 
    element: <RootLayout />,
    children: [

      // non protected routes
      { index:true, element: <HomePage /> },
      { path:'/contact', element: <Contact /> },
      { path:'/support', element: <Support /> },


      // protected route [must authenticate before accessing]
      { path:'/select-project', element: <PrivateRoute><SelectProject /></PrivateRoute> },
      { path:'/deploy-project/:id', element: <PrivateRoute><DeployProject /></PrivateRoute> },

      // not found route
      { path:'/*', element: <NotFound /> },
    ]
  }
])

export default function App(){

  return (
    <Provider store={store}>
    <ToastContainer />
     <RouterProvider router={router} />
    </Provider>  
  )

}