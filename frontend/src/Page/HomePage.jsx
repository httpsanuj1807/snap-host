import { Link, useNavigate } from "react-router-dom";

import { IoLogoVercel } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdGitMerge } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";

import customerImg from "../assets/customer.png";

import { useSelector } from "react-redux";

const liItems = [
  "Deploy automatically from git",
  "Previews for logs",
  "Customize you domain",
  "Instant Rollbacks",
];

import Button from "../components/Button";
import { toast } from "react-toastify";


export default function HomePage() {

  const { isAuth } = useSelector(state => state.auth);

  const navigate = useNavigate();

  
  function handleStartDeploying(){

    if(!isAuth){

      toast.dismiss();
      toast.error('Please login first', {
        autoClose: 4000, pauseOnHover: false
      });
      
      return;

    }

    navigate('/select-project');

  }

  return (
    <main className="flex flex-col">

      <div className="px-8 lg:px-24 py-5 lg-py-10 pb-5 flex flex-col gap-4 text-center justify-center items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
          From localhost to https, in seconds
        </h1>
        <p className="font-mono text-xs sm:px-16 lg:text-base text-slate-600 flex items-center gap-1">
          Develop with your favorite tools Launch globally
          <span className="hidden lg:block">
            <AiOutlineGlobal />
          </span>
          , instantly Keep pushing
          <span className="hidden lg:block">
            <IoMdGitMerge />
          </span>
        </p>
        <div className="flex gap-6 ">
          <div onClick={handleStartDeploying}>
            <Button type="black">
              <IoLogoVercel /> Start Deploying
            </Button>
          </div>
          <Link to='/'>
            <Button type="white">Watch Demo</Button>
          </Link>
        </div>
      </div>
      
      <div className="px-8 lg:px-24 gap-8 pb-5 lg:gap-8 flex-1 flex flex-col md:flex-row  justify-between items-center ">
        <div className="h-full w-full md:w-2/5 p-8 md:p-4 lg:p-8">
          <p className="text-xl sm:text-2xl text-gray-900 font-bold mb-2">
            Ready to deploy ?
          </p>
          <ul>
            {liItems.map((item) => {
              return (
                <li
                  key={item}
                  className="flex mx-auto items-center gap-1 mb-1 sm:text-sm text-slate-600"
                >
                  <span>
                    <FaRegCheckCircle color="green" />
                  </span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="h-full w-full md:w-3/5  bg-black text-white p-8  md:p-4 md:placeholder:pb-0 lg:p-8 rounded-3xl bg-[linear-gradient(to_right,#ffffff1A_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1A_1px,transparent_1px)] bg-[size:24px_24px]">
          <h1 className="text-xl sm:text-2xl flex items-center gap-2 font-bold mb-2 b">
            Perfect choice for beginners
            <span className="mt-2 hidden md:block">
              <FaRocket size="0.7em" />
            </span>
          </h1>
          <p className="text-xs sm:text-sm mb-2">
            I found this service incredibly valuable. It streamlined my entire
            workflow, allowing me to focus more on development without worrying
            about the complexities of deployment and infrastructure. Highly
            recommend it to any developer or team looking to simplify their
            operations and scale effortlessly!
          </p>
          <div className="flex gap-2 items-center">
            <img
              src={customerImg}
              className="rounded-full h-10 w-10 object-cover"
            />
            <span className="font-medium text-sm">
              Alex, Senior Software Engineer
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
