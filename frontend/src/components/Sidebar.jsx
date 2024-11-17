import { useSelector  } from "react-redux";

import { FaGithub } from "react-icons/fa";
import { IoMdGitMerge } from "react-icons/io";

import { Link } from "react-router-dom";

export default function Sidebar(){

    const { repoSelected } = useSelector((state) => state.github);
    const { pageState } = useSelector((state) => state.basic);

    return(
        <div className="hidden lg:flex w-2/6 flex-col">
        <div className="bg-gray-100  mb-12 w-3/4 ml-12 pl-4 justify-start text-gray-900 font-semibold flex gap-2 items-center  py-5 rounded-md">
          <FaGithub />
          {repoSelected ? `${repoSelected.name}` : ""}
        </div>

        <div className="w-full pl-12 pr-12 pt-6 border sticky top-0 bg-gray-100">
          <ol className="relative border-s mb-10 border-gray-200">
            <li className="mb-2 ms-4">
              <div
                className={`absolute ${
                  pageState === "configure" ? "bg-black " : "bg-gray-200"
                } w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white`}
              ></div>
              <h3
                className={`text-sm font-semibold ${
                  pageState === "configure"
                    ? "text-gray-900 "
                    : "text-gray-600"
                }`}
              >
                Configure Project
              </h3>
            </li>
            <li className="mb-2 ms-4">
              <div
                className={`absolute ${
                  pageState === "deploy" ? "bg-black " : "bg-gray-200"
                } w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white`}
              ></div>
              <h3
                className={`text-sm font-semibold ${
                  pageState === "deploy" ? "text-gray-900 " : "text-gray-600"
                }`}
              >
                Deploy
              </h3>
            </li>
          </ol>
          <hr className="bg-gray-200 h-[0.1em]" />
          <div className="mt-6 mb-10">
            <p className="text-sm text-gray-600 font-semibold mb-2">
              Git Repository
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-900 font-semibold mb-1">
              <FaGithub />{" "}
              {repoSelected ? `${repoSelected.full_name}` : "loading.."}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-900 font-semibold">
              <IoMdGitMerge />{" "}
              {repoSelected ? `${repoSelected.default_branch}` : ""}
            </p>
          </div>
          <hr className="bg-gray-200 h-[0.1em]" />
          <div className="mt-6 mb-10">
            <Link to="/select-project">
              {" "}
              <p className="text-sm  text-gray-600">
                {" "}
                Import a different repository{" "}
              </p>
            </Link>
          </div>
        </div>
      </div>
    )

}