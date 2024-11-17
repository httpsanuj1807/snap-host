import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { outputActions } from "../store/outputSlice";
import { basicActions } from "../store/basicSlice";

import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

export default function Deploy() {
  const dispatch = useDispatch();

  const { logs, deployProgress, previewUrl } = useSelector(
    (state) => state.output
  );
  const { setProjectName, setPreviewUrl, setLogs, setDeployProgress } =
    outputActions;
  const { setPageState } = basicActions;

  useEffect(() => {
    return () => {
      dispatch(setProjectName(""));
      dispatch(setPreviewUrl(""));
      dispatch(setLogs([]));
      dispatch(setDeployProgress("notStarted"));
      dispatch(setPageState("configure"));
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        {deployProgress === "deploying" && "Deploying..."}
        {deployProgress === "deploySuccess" && (
          <>
            Deployment Completed{" "}
            <FaCheckCircle className="inline-block" size={28} color="green" />
          </>
        )}
        {deployProgress === "deployFailed" && (
          <>
            Deployment Failed{" "}
            <IoIosCloseCircle className="inline-block" size={28} color="red" />
          </>
        )}
      </h1>

      {deployProgress === "deploySuccess" && (
        <p
          className={`mb-2 text-sm ${
            deployProgress === "deploySuccess" ? "text-gray-900" : "text-gray-400"
          } `}
        >
          Visit your project here:{" "}
          <a className="font-semibold" target="_blank" href={previewUrl}>
            {previewUrl}
          </a>
        </p>
      )}

      <hr className="bg-gray-200 h-[0.1em]" />
      <div className="bg-gray-900 h-full  py-2 flex flex-col gap-1 text-gray-400 text-xs font-semibold  rounded-sm">
        {logs.length === 0 && (
          <p className="px-4 py-2">Waiting for deployment logs...</p>
        )}
        {logs.length > 0 &&
          logs.map((log, index) => {
            return (
              <div key={log}>
                <p className="px-4 py-1" key={log + index}>
                  Log {index + 1}: {log}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
