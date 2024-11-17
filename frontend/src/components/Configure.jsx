import { useState } from "react";
import { basicActions } from "../store/basicSlice";
import { inputActions } from "../store/inputSlice";
import { useSelector, useDispatch } from "react-redux";

import frameworkSettings from "../utils/frameworkSetting";

export default function Configure({ handleDeployStart }) {
  const { error, loading } = useSelector((state) => state.basic);

  const { slug, framework, envVar } = useSelector((state) => state.input);
  const dispatch = useDispatch();
  const { setError } = basicActions;
  const { setSlug, setFrameWork, setEnvVar, removeEnvVar } = inputActions;

  const [envKey, setKey] = useState("");
  const [envValue, setValue] = useState("");

  function handleFrameworkChange(e) {
    if (e.target.value === "craReact") {
      dispatch(setFrameWork(frameworkSettings.craReact));
    } else {
      dispatch(setFrameWork(frameworkSettings.viteReact));
    }
  }

  function handleAddEnv() {
    dispatch(setError(""));
    const key = envKey;
    const value = envValue;

    if (key.trim() === "" || value.trim() === "") {
      dispatch(setError("Field cannot be empty."));
      return;
    }

    if (
      key.length < 4 ||
      value.length < 4 ||
      key.length > 30 ||
      value.length > 30
    ) {
      dispatch(
        setError("Key and value allowed length is between 4-30 characters.")
      );
      return;
    }

    dispatch(setEnvVar({ key, value }));
    setKey("");
    setValue("");
  }

  function handleRemoveEnv(key) {
    dispatch(removeEnvVar(key));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    const sanitizedValue = value.replace(/\s+/g, "");

    if (name === "envKey") {
      setKey(sanitizedValue);
    } else if (name === "envValue") {
      setValue(sanitizedValue);
    } else if (name === "projectName") {
      dispatch(setSlug(sanitizedValue));
    }
  }

  return (
    <>
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
            disabled={loading}
            name="projectName"
            className="bg-gray-100 border outline-none  rounded py-3 px-3 text-sm"
            value={slug}
            onChange={handleInputChange}
          />
          <p className="text-xs text-gray-400 mt-1">
            <strong>
              This name will be used as part of your deployment custom domain
              link.
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
            disabled={loading}
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
        <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-8">
          <div className="flex w-full md:w-2/5  flex-col">
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
              name="envKey"
              onChange={handleInputChange}
              value={envKey}
            />
          </div>
          <div className="flex w-full md:w-2/5 flex-col">
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
              name="envValue"
              onChange={handleInputChange}
              value={envValue}
            />
          </div>
          <div className="flex w-1/5 items-end">
            <button
              type="button"
              disabled={loading}
              onClick={handleAddEnv}
              className={`h-[2.6em] ${
                loading ? "bg-gray-700" : "bg-black"
              }  text-white rounded px-8 text-sm`}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          {envVar.map((env) => {
            const { key, value } = env;
            return (
              <div key={key} className="mt-4 flex gap-4 md:gap-8">
                <div className="flex w-1/4 md:w-2/5  flex-col">
                  <input
                    disabled
                    value={key}
                    className="bg-gray-100 border outline-none  rounded py-2 px-1 md:px-3 text-sm"
                  />
                </div>
                <div className="flex w-1/4 md:w-2/5  flex-col">
                  <input
                    disabled
                    value={value}
                    className="bg-gray-100 border outline-none  rounded py-2 px-1 md:px-3 text-sm"
                  />
                </div>
                <div className="flex-1 md:w-1/5 items-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleRemoveEnv(key)}
                    className={`h-[2.6em] ${
                      loading ? "bg-red-300" : "bg-red-600"
                    } text-white rounded px-8 text-sm`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        <button
          disabled={loading}
          onClick={handleDeployStart}
          type="button"
          className={`w-full py-2 rounded mt-10 text-white ${
            loading ? "bg-gray-700" : "bg-black"
          }`}
        >
          {loading ? "Starting Deployment..." : "Deploy"}
        </button>
      </form>
    </>
  );
}
