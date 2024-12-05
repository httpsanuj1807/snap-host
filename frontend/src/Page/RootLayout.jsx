import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IoLogoVercel } from "react-icons/io5";

export default function Layout() {
  const dispatch = useDispatch();
  const { setIsLogin } = authActions;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}/api/auth/verify-user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (res.ok && resData.data) {
          dispatch(setIsLogin(resData.data));
        }

        setTimeout(() => {
          setIsLoading(false);          
        },1200);
        return;
      } catch (err) {
        console.error(err);
      }
    }

    checkAuth();
  }, [dispatch, setIsLogin]);


  if (isLoading) {
    return (
      <div className="bg-black h-screen flex justify-center items-center">
        <div className="flex gap-2 items-center justify-center"><IoLogoVercel size={12} color="white" /><h2 className="text-white text-sm">Please wait, we’re setting things up for you...</h2></div>
      </div>
    );
  }


  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
