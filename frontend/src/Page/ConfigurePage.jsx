import { FaUserFriends } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import deployImg from '../assets/deploy-img.png';

import gitRepos from "../assets/gitRepos";
import { timeSinceLastPush } from "../utils/convertTime";


export default function ConfigurePage() {
  return (
    <main>
      <div className="flex flex-col md:flex-row text-center md:text-left md:flex p-12">
        <div className="flex-1">
          <p className="text-3xl lg:text-5xl font-bold text-gray-900">
            Let's build something new.
          </p>
          <p className="py-2 font-mono text-slate-600">
            To deploy a new Project, import an existing{" "}
            <span className="text-black font-semibold">public</span> Git
            Repository
          </p>
        </div>
        <div className="md:w-60 flex justify-center items-center">
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded p-[0.20em] mt-3 md:mt-0">
            <button className="bg-white text-black font-light px-6 py-1 flex justify-center items-center gap-2">
              <span className="">
                <FaUserFriends />{" "}
              </span>
              <span>Collaborate on pro</span>
            </button>
          </div>
        </div>
      </div>

      {/* form */}

      <div className="px-4 sm:px-12 flex flex-col lg:flex-row gap-8 justify-between">
        <div className="border rounded-lg bg-white p-6 md:p-4   lg:w-3/5">
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            Import Git Repository
          </p>

          <div className="flex  justify-start gap-4 mb-2">
            <div className=" flex sm:w-1/2 gap-3 items-center rounded pl-3 border-2 border-gray-100">
              <span>
                <FaGithub size="18" />
              </span>
              <input
                className="px-2 py-2 rounded-r flex-1 text-sm focus:outline-none"
                type="text"
                required
                defaultValue="https_anuj1807"
              />
            </div>

            <button className="px-2 sm:px-8 rounded bg-black text-white">
              Import From Github
            </button>
          </div>

          {/* repos container */}
          <div className="border rounded">
            {gitRepos.map((repo, index) => {
              return (
                <div key={repo.name} className={`h-16 ${index === 4 ? '' : 'border-b'} flex justify-between items-center pr-4 pl-4`}>
                  <div className="flex items-center gap-3">
                    <IoLogoVercel />
                    <p className="font-semibold text-gray-900">
                      {gitRepos[index].name}{" "}
                      <span className="text-slate-600 text-sm font-light font-mono">
                        {" "}
                        &#128909;{timeSinceLastPush(gitRepos[index].pushed_at)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button className="px-5 py-1 rounded bg-black text-white">
                      Import
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center flex-1 rounded-lg ">
            <img className="h-72 rounded-xl object-contain" src={deployImg} />
        </div>
      </div>
    </main>
  );
}
