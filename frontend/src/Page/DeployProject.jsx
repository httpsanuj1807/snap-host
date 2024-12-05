import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { githubActions } from "../store/githubSlice";
import { inputActions } from "../store/inputSlice";
import { basicActions } from "../store/basicSlice";

import Configure from "../components/Configure";
import Deploy from "../components/Deploy";
import TopTitle from "../components/TopTitle";
import Sidebar from "../components/Sidebar";
import { outputActions } from "../store/outputSlice";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_SOCKET_PORT}`);

export default function DeployProject() {
  const { id } = useParams();

  const { repoSelected } = useSelector((state) => state.github);
  const { pageState } = useSelector((state) => state.basic);
  const { slug, gitURL, envVar } = useSelector((state) => state.input);
  const { deployProgress, previewUrl } = useSelector((state) => state.output);
  const { setSelectedRepo } = githubActions;
  const { setSlug, setGitUrl } = inputActions;
  const { setPageState, toggleLoading } = basicActions;
  const { setProjectName, setPreviewUrl, setLogs, setDeployProgress } =
    outputActions;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!repoSelected) {
      const storedRepo = JSON.parse(localStorage.getItem("repoSelected"));
      if (storedRepo && storedRepo.name !== id) {
        navigate("/select-project", { replace: true });
      }
      if (storedRepo) {
        dispatch(setSelectedRepo(storedRepo));
        dispatch(setSlug(storedRepo.name));
        dispatch(setGitUrl(storedRepo.clone_url));
      } else {
        navigate("/select-project", { replace: true });
      }
    } else {
      dispatch(setSlug(repoSelected.name));
      dispatch(setGitUrl(repoSelected.clone_url));
    }
  }, [dispatch, repoSelected, navigate, setGitUrl, setSelectedRepo, setSlug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageState]);

  useEffect(() => {
    if (slug) {
      socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        dispatch(setLogs(parsedMessage.log));
        if (parsedMessage.log === "Upload Completed") {
          dispatch(setDeployProgress("deploySuccess"));
        }
        if (
          parsedMessage.log ===
          "Build Failed, please refer logs for fixes and retry."
        ) {
          dispatch(setDeployProgress("deployFailed"));
        }
      });
    }
    return () => {
      if (slug) {
        socket.emit("unsubscribe", `logs:${slug}`);
        socket.off("message");
      }
    };
  }, [dispatch, slug]);

  async function handleDeployStart(e) {
    e.preventDefault();
    dispatch(toggleLoading());

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${import.meta.env.VITE_BACKEND_PORT}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gitURL,
        slug,
        envVar,
      }),
    });

    const resData = await response.json();
    socket.emit("subscribe", `logs:${slug}`);

    if (resData && resData.data) {
      dispatch(setProjectName(resData.data.projectSlug));
      dispatch(setPreviewUrl(resData.data.url));
    }

    setTimeout(() => {
      dispatch(toggleLoading());
      dispatch(setDeployProgress('deploying'))
      dispatch(setPageState("deploy"));
    }, 2000);
  }

  return (
    <main>
      {pageState === "configure" ? (
        <TopTitle
          title="You are almost done."
          subHeading="Please follow the steps to configure your Project and deploy it."
        />
      ) : (
        <TopTitle
          title={
            (deployProgress === "deploying" && "We are building for you.") ||
            (deployProgress === "deployFailed" && "Deployment Failed.") ||
            (deployProgress === "deploySuccess" && "Deployment Completed")
          }
          subHeading={
            (deployProgress === "deploySuccess" && (
              <>
                You can now preview your deployment here:{" "}
                <a
                  className="text-gray-900 font-semibold"
                  href={previewUrl}
                  target="_blank"
                >
                  {previewUrl}
                </a>
              </>
            )) ||
            (deployProgress === "deploying" &&
              "You can preview your deployment once we set up for you.") ||
            (deployProgress === "deployFailed" &&
              "Deployment failed for some reasons. Please refer logs for fixes.")
          }
        />
      )}

      <div className="flex lg:px-0 flex-col lg:flex-row  justify-between">
        <Sidebar />
        <div className="border rounded bg-gray-50 pt-5 pb-16 pl-6 pr-6  lg:flex-1">
          {pageState === "configure" ? (
            <Configure handleDeployStart={handleDeployStart} />
          ) : (
            <Deploy />
          )}
        </div>
      </div>
    </main>
  );
}
