import { useEffect } from "react";
import { basicActions } from "../store/basicSlice";
import { githubActions } from "../store/githubSlice";
import { inputActions } from "../store/inputSlice";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { FaGithub } from "react-icons/fa";
import { IoMdGitMerge } from "react-icons/io";
import { FaReact } from "react-icons/fa";

import frameworkSettings from "../utils/frameworkSetting";
import { useRef } from "react";

export default function DeployProject() {
  const { error, loading } = useSelector((state) => state.basic);
  const { userName, gitRepos, repoSelected } = useSelector(
    (state) => state.github
  );
  const { framework, envVar } = useSelector((state) => state.input);
  const dispatch = useDispatch();
  const { setUserName, setGitRepos, setSelectedRepo } = githubActions;
  const { setError, toggleLoading } = basicActions;
  const { setFrameWork, setEnvVar, removeEnvVar } = inputActions;

  const navigate = useNavigate();
  const envKeyRef = useRef(null);
  const envValueRef = useRef(null);

  useEffect(() => {
    if (!repoSelected) {
      const storedRepo = JSON.parse(localStorage.getItem("repoSelected"));
      if (storedRepo) {
        dispatch(setSelectedRepo(storedRepo));
      } else {
        navigate("/select-project", { replace: true });
      }
    }
  }, [dispatch]);

  function handleFrameworkChange(e) {
    if (e.target.value === "craReact") {
      dispatch(setFrameWork(frameworkSettings.craReact));
    } else {
      dispatch(setFrameWork(frameworkSettings.viteReact));
    }
  }

  function handleAddEnv() {
    const key = envKeyRef.current.value;
    const value = envValueRef.current.value;
  
    if (key.trim() === '' || value.trim() === '') {
      return;
    }
  
    dispatch(setEnvVar({ key, value }));
    envKeyRef.current.value = '';
    envValueRef.current.value = '';
  }

  function handleRemoveEnv(key){

    dispatch(removeEnvVar((key)));

  }

  function handleDeployStart(e){
    e.preventDefault();
  }

  return (
    <main>
      <div className="p-12 pb-6 text-center md:text-left">
        <p className="text-4xl  lg:text-5xl font-bold text-gray-900">
          You're almost done.
        </p>
        <p className="py-2 px-4 md:px-0 sm text-sm lg:text-base font-mono text-slate-600">
          Please follow the steps to configure your Project and deploy it.
        </p>
      </div>

      <div className="flex px-12 lg:px-0 flex-col lg:flex-row  justify-between">
        <div className="hidden lg:flex w-2/6 flex-col">
          <div className="bg-gray-100  mb-12 w-3/4 ml-12 pl-4 justify-start text-gray-900 font-semibold flex gap-2 items-center  py-5 rounded-md">
            <FaGithub />
            {repoSelected ? `${repoSelected.name}` : ""}
          </div>

          <div className="w-full pl-12 pr-12 pt-6 border sticky top-0 bg-gray-100">
            <ol className="relative border-s mb-10 border-gray-200">
              <li className="mb-2 ms-4">
                <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Configure Project
                </h3>
              </li>
              <li className="mb-2 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <h3 className="text-sm font-semibold text-gray-600">Deploy</h3>
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

        <div className="border rounded bg-gray-50 pt-5 pb-16 pl-6 pr-6  lg:flex-1">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">
            Configure Project
          </h1>
          <hr className="bg-gray-200 h-[0.1em]" />
          <form onSubmit={handleDeployStart}>
            <div className="flex mt-4 flex-col">
              <label
                htmlFor="projectName"
                className="text-sm font-thin mb-1 text-gray-600"
              >
                Project Name{" "}
                <span className="text-gray-500">(custom domain specific)</span>
              </label>
              <input
                id="projectName"
                required
                name="projectName"
                className="bg-gray-100 border outline-none  rounded py-3 px-3 text-sm"
                defaultValue={repoSelected ? repoSelected.name : ""}
              />
              <p className="text-xs text-gray-500 mt-1">
                <strong>
                  This name will be used as part of your deployment custom
                  domain link.
                </strong>
              </p>
            </div>

            <div className="flex mt-4 flex-col">
              <label
                htmlFor="framework"
                className="text-sm font-thin mb-1 text-gray-600"
              >
                Framework Preset
              </label>
              <select
                required
                id="framework"
                name="framework"
                value={framework.name}
                onChange={handleFrameworkChange}
                className="bg-gray-100 border rounded outline-none  py-3 px-3 text-sm"
              >
                <option value="craReact">CRA - React</option>
                <option value="viteReact">Vite - React</option>
                <option disabled>Coming soon...</option>
              </select>
            </div>

            <p className="mt-12 ">Build and Output Settings</p>

            <div className="flex mt-4 flex-col">
              <label
                htmlFor="buildCommand"
                className="text-sm font-thin mb-1 text-gray-600"
              >
                Build Command
              </label>
              <input
                id="buildCommand"
                readOnly
                name="buildCommand"
                className="bg-gray-100 cursor-not-allowed border outline-none rounded py-3 px-3 text-sm"
                value={framework.buildCommand}
                disabled
              />
            </div>
            <div className="flex mt-4 flex-col">
              <label
                htmlFor="outputDirectory"
                className="text-sm font-thin mb-1 text-gray-600"
              >
                Output Directory
              </label>
              <input
                id="outputDirectory"
                readOnly
                name="outputDirectory"
                className="bg-gray-100 cursor-not-allowed border outline-none rounded py-3 px-3 text-sm"
                value={framework.outputDir}
                disabled
              />
            </div>
            <div className="flex mt-4 flex-col">
              <label
                htmlFor="installCommand"
                className="text-sm font-thin mb-1 text-gray-600"
              >
                Install Command
              </label>
              <input
                id="installCommand"
                readOnly
                name="installCommand"
                className="bg-gray-100 cursor-not-allowed border outline-none rounded py-3 px-3 text-sm"
                value={framework.installCommand}
                disabled
              />
            </div>

            <p className="mt-12">Environment Variables</p>

            <div className="mt-4 flex gap-8">
              <div className="flex w-2/5  flex-col">
                <label
                  htmlFor="envKey"
                  className="text-sm font-thin mb-1 text-gray-600"
                >
                  Key
                </label>
                <input
                  className="bg-gray-100 border outline-none  rounded py-2 px-3 text-sm"
                  type="text"
                  placeholder="EXAMPLE_NAME"
                  ref={envKeyRef}
                />
              </div>
              <div className="flex w-2/5  flex-col">
                <label
                  htmlFor="envValue"
                  className="text-sm font-thin mb-1 text-gray-600"
                >
                  Value
                </label>
                <input
                  className="bg-gray-100 border outline-none  rounded py-2 px-3 text-sm"
                  type="text"
                  placeholder="IQUI93NS208DN"
                  ref={envValueRef}
                />
              </div>
              <div className="flex w-1/5 items-end">
                <button type="button" onClick={handleAddEnv} className="bg-black h-[2.6em]  text-white rounded px-8 text-sm">
                  Add
                </button>
              </div>
            </div>

            <div>{envVar.map((env) => {
              const {key, value} = env;
              return ( <div key={key} className="mt-4 flex gap-8">
                    <div className="flex w-2/5  flex-col">
                      <input
                        disabled
                        value={key}
                        className="bg-gray-100 border outline-none  rounded py-2 px-3 text-sm"
                      />
                    </div>
                    <div className="flex w-2/5  flex-col">
                      <input
                        disabled
                        value={value}
                        className="bg-gray-100 border outline-none  rounded py-2 px-3 text-sm"
                      />
                    </div>
                    <div className="flex w-1/5 items-end">
                      <button type="button" onClick={() => handleRemoveEnv(key)} className="bg-red-600 h-[2.6em] text-white rounded px-8 text-sm">
                        Remove
                      </button>
                    </div>
                  </div>)
            })}</div>

            <button type="submit" className="bg-black text-white w-full py-2 rounded mt-10">Deploy</button>
          </form>
        </div>
      </div>
    </main>
  );
}
