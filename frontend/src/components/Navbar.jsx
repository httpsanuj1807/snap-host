import { Link, useLocation } from "react-router-dom";

import { IoLogoVercel } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

import Button from "./Button";

export default function Navbar() {

  const { pathname } = useLocation();
  

  return (
    <nav className="bg-slate-900 h-16 px-4 text-white flex justify-between py-3 md:px-16 items-center ">
      <div className="h-full flex items-center px-4 gap-1 font-semibold text-xl">
        <IoLogoVercel />
        <Link className="">Vercel</Link>
      </div>
      <div className="h-full flex px-4 items-center gap-8">
        <div className="hidden sm:flex items-center gap-3">
          <Link>Home</Link>
          <Link>Docs</Link>
          <Link>Support</Link>
          <Link>Contact</Link>
        </div>
       {pathname && pathname === '/' && <Link to='/select-project'> <Button type="green">
          <FaPlus className="text-sm" /> Deploy
        </Button></Link>}
      </div>
    </nav>
  );
}
