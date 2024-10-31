import { Link } from "react-router-dom";

import { IoLogoVercel } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdGitMerge } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";

import customerImg from "../assets/customer.png";

const liItems = [
  "Deploy automatically from git",
  "Previews for logs",
  "Customize you domain",
  "Instant Rollbacks",
];

import Button from "../components/Button";

export default function HomePage() {
  return (
    <main className="h-[calc(100vh-64px-40px)] flex flex-col bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ">
      <div className="px-8 lg:px-24 py-10 pb-5 flex flex-col gap-4 text-center justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          From localhost to https, in seconds
        </h1>
        <p className="font-mono text-xs sm:px-16 sm:text-base text-slate-600 flex items-center gap-1">
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
          <Link>
            <Button type="black">
              <IoLogoVercel /> Start Deploying
            </Button>
          </Link>
          <Link>
            <Button type="white">Watch Demo</Button>
          </Link>
        </div>
      </div>
      <div className="px-24 pb-5 gap-8 flex-1  flex justify-between items-center ">
        <div className="h-full w-1/2 p-8">
          <p className="text-3xl text-gray-900 font-bold mb-2">
            Ready to deploy ?
          </p>
          <ul>
            {liItems.map((item) => {
              return (
                <li
                  key={item}
                  className="flex items-center gap-1 mb-1 text-sm text-slate-600"
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
        <div className="h-full w-1/2 bg-black text-white p-8 rounded-3xl bg-[linear-gradient(to_right,#ffffff1A_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1A_1px,transparent_1px)] bg-[size:24px_24px]">
          <h1 className="text-3xl flex items-center gap-2 font-bold mb-2 b">
            Perfect choice for beginners
            <span className="mt-2">
              <FaRocket size="0.7em" />
            </span>
          </h1>
          <p className="text-sm mb-2">
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