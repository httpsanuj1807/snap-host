import { Link } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config.js";

import { IoLogoVercel } from "react-icons/io5";

import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice.js";

import Button from "./Button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Navbar() {
  const provider = new GithubAuthProvider();
  const dispatch = useDispatch();
  const { setIsLogin, setIsLogout } = authActions;
  const { isAuth, userProfile } = useSelector((state) => state.auth);

  const handleStartAuth = async () => {
    try {

      provider.setCustomParameters({
        prompt: "select_account", 
      });

      const res = await signInWithPopup(auth, provider);

      const user = res.user;

      let userDetails = {
        userName: user.reloadUserInfo.screenName,
        email: user.email,
        photoUrl: user.photoURL,
      };

      const access_token = user.accessToken;
      const expirationTime = user.stsTokenManager.expirationTime;

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}/api/auth/github`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userDetails, access_token, expirationTime }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          toast.error(responseData.message);
          return;
        }

        const userProfile = responseData.data;
        toast.success("Login Success", {
          autoClose: 2000,
          pauseOnHover: false,
        });
        dispatch(setIsLogin(userProfile));
      } catch (err) {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Error authenticating with github.");
    }
  };

  async function handleLogout() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}/api/auth/signout`, {
      credentials: "include",
    });

    if (!response.ok) {
      toast.error("Something went wrong.");
      return;
    }

    dispatch(setIsLogout());
    toast.success("Signout Success", { autoClose: 2000, pauseOnHover: false });
  }

  return (
    <nav className="bg-slate-900 h-16 px-4 text-white flex justify-between py-3 md:px-16 items-center ">
      <div className="h-full flex items-center px-4 gap-1 font-semibold text-xl">
        <IoLogoVercel />
        <Link className="">Vercel</Link>
      </div>
      <div className="h-full flex px-4 items-center gap-8">
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/">Home</Link>
          <Link to="/docs">Docs</Link>
          <Link to="/support">Support</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <p onClick={isAuth ? undefined : handleStartAuth}>
          <Button>
            {isAuth ? (
              `${userProfile.userName}`
            ) : (
              <>
                <FaGithub size={24} /> Login
              </>
            )}
          </Button>
        </p>
        {isAuth && (
          <div className="cursor-pointer" onClick={handleLogout}>
            <p data-tooltip-id="logout-tooltip" data-tooltip-content="Logout">
              <FiLogOut size={28} />
            </p>
            <ReactTooltip
              style={{ backgroundColor: "#15803d", color: "#ffffff" }}
              id="logout-tooltip"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
