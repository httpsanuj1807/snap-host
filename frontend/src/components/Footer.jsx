import { TbPointFilled } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";





export default function Footer() {

  const { pathname } = useLocation();

  return (
    <footer className={`h-10 ${ pathname === '/configure-project' ? '' : 'md:fixed'}  px-8 py-2 flex justify-between items-center md:bottom-0 md:left-0 w-full`}>
      <p className="hidden sm:flex items-center font-medium 600 text-sm text-[#0070f3] cursor-pointer">
        <TbPointFilled style={{ color: "#0070f3", fontSize: "1.2em" }} />
        All systems normal
      </p>
      <div className="flex text-xs gap-1 text-slate-600">
        <p>© 2024 |</p>
        <p>By Anuj Kumar </p>
        <p className="hidden sm:flex items-end gap-1 justify-center">| Powered by <span className="text-[#ff9900] cursor-pointer"> Amazon Web Services</span></p>
      </div>
      <div className="flex gap-3">
      <Link><FaLinkedin /></Link>
      <Link><FaGithub /></Link>
      <Link><SiGmail /></Link>
      
      
      </div>
    </footer>
  );
}
