import { TbPointFilled } from "react-icons/tb";

import { useLocation } from "react-router-dom";
import SocialHandles from "./SocialHandles";

export default function Footer() {

  const { pathname } = useLocation();
  const isFooterFixed = pathname === '/' || pathname === '/contact' || pathname === '/support';

  return (
    <footer className={`h-10  ${ isFooterFixed ? 'md:fixed' : ''}  px-8 py-2 flex justify-between items-center md:bottom-0 md:left-0 w-full`}>
      <p className="hidden sm:flex items-center font-medium 600 text-sm text-[#0070f3] cursor-pointer">
        <TbPointFilled style={{ color: "#0070f3", fontSize: "1.2em" }} />
        All systems normal
      </p>
      <div className="flex text-xs gap-1 text-slate-600">
        <p>© 2024 |</p>
        <p>By Anuj Kumar </p>
        <p className="hidden sm:flex items-end gap-1 justify-center">| Powered by <span className="text-[#ff9900] cursor-pointer"> Amazon Web Services</span></p>
      </div>
      <SocialHandles />
      
    </footer>
  );
}
