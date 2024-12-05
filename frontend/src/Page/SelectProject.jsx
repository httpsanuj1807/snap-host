import { FaUserFriends } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import deployImg from "../assets/deploy-img.png";

import { timeSinceLastPush } from "../utils/convertTime";
import { useEffect, useRef, useState } from "react";

import { basicActions } from "../store/basicSlice";
import { githubActions } from "../store/githubSlice";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function SelectProject() {
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.basic);
  const { gitRepos } = useSelector((state) => state.github);
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { setGitRepos, setSelectedRepo } = githubActions;
  const { setError, toggleLoading, setPageState } = basicActions;

  const repoInputFieldRef = useRef(null);

  const [repoToShow, setRepoToShow] = useState([]);

  async function fetchRepositories() {
    dispatch(setError(""));
    dispatch(toggleLoading());

    try {
      const response = await fetch(
        `https://api.github.com/users/${userProfile.userName}/repos?sort=pushed&direction=desc`,
        {
          headers: {
            Authorization: import.meta.env.VITE_GIT_TOKEN,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const errorMessage =
          response.status === 404
            ? "Invalid github username. Please check and try again."
            : "Something went wrong. Try again later.";
        dispatch(setError(errorMessage));
        dispatch(setGitRepos([]));
        dispatch(toggleLoading());
        return;
      }
      dispatch(setGitRepos(responseData));
      setRepoToShow([...responseData.slice(0, 5)]);
      dispatch(toggleLoading());
    } catch (err) {
      dispatch(toggleLoading());
      dispatch(setGitRepos([]));
      dispatch(setError("Something went wrong. Try again later."));
    }
  }

  function handleImportButton(index) {
    const selectedRepo = repoToShow[index];
    dispatch(setSelectedRepo(selectedRepo));
    localStorage.setItem("repoSelected", JSON.stringify(selectedRepo));
    dispatch(setPageState("configure"));

    navigate(`/deploy-project/${selectedRepo.name}`);
  }

  useEffect(() => {
    fetchRepositories();
  }, [userProfile]);

  function handleSearchRepo() {
    const searchQuery = repoInputFieldRef.current.value.toLowerCase().trim();

    const searchWords = searchQuery.toLowerCase().split(" ");

    const topRepos = gitRepos
    .map((repo) => {
      const repoNameLower = repo.name.toLowerCase();
      const score = searchWords.reduce((acc, word) => {
        return repoNameLower.includes(word) ? acc + 1 : acc;
      }, 0);

      return { ...repo, score };
    })
    .filter((repo) => repo.score > 0) 
    .sort((a, b) => b.score - a.score) 
    .slice(0, 5); 

    setRepoToShow(topRepos);
  }

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

      <div className="px-4 sm:px-12  flex flex-col lg:flex-row gap-8 justify-between">
        <div className="border rounded-lg p-2  md:p-4  lg:w-3/5">
          <div className="flex justify-between font-semibold text-gray-900 mb-4">
            <div className="text-xl flex-1 sm:text-2xl">
              Import Git Repository
            </div>
            <div className=" flex gap-3 w-1/3   items-center rounded pl-3 border-2 border-gray-100">
              <span>
                <FaGithub size="18" />
              </span>
              <input
                className="py-2 rounded-r w-full flex-1 text-xs focus:outline-none"
                type="text"
                required
                value={userProfile.userName}
                readOnly
              />
            </div>
          </div>

          <div className="flex  justify-start gap-4 mb-2">
            <div className=" flex sm:w-1/2 gap-3  items-center rounded pl-3 border-2 border-gray-100">
              <span>
                <RiGitRepositoryCommitsFill size="18" />
              </span>
              <input
                ref={repoInputFieldRef}
                className="px-2 py-2 rounded-r flex-1 text-xs focus:outline-none"
                type="text"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchRepo(); 
                  }
                }}
                placeholder="your-github-repository"
              />
            </div>

            <button
              disabled={loading}
              onClick={handleSearchRepo}
              className={`px-2 text-xs sm:px-8 rounded bg-black text-white ${
                loading ? "opacity-90 cursor-not-allowed" : ""
              }`}
            >
              Search a repository
            </button>
          </div>

          {/* repos container */}

          {repoToShow.length === 0 &&
            !error &&
            !loading &&
            userProfile.userName && (
              <p className="text-slate-600 text-center p-2 text-sm">
                No repositories to show.
              </p>
            )}
          {error && !loading && (
            <p className="text-red-600 text-center p-2 text-sm">{error}</p>
          )}
          {!error && loading && (
            <p className="text-slate-600 text-center p-2 text-sm">
              Hold tight, fetching repositories for you...
            </p>
          )}

          {repoToShow.length > 0 && !error && !loading && (
            <div className="border rounded">
              {" "}
              {repoToShow.map((repo, index) => {
                return (
                  <div
                    key={repo.name}
                    className={`h-16 ${
                      index === 4 ? "" : "border-b"
                    } flex justify-between items-center pr-4 pl-4`}
                  >
                    <div className="flex items-center gap-3">
                      <IoLogoVercel />
                      <p className="font-semibold text-xs text-gray-900">
                        {repoToShow[index].name}{" "}
                        <span className="text-slate-600 text-sm font-light font-mono">
                          {" "}
                          &#128909;
                          {timeSinceLastPush(repoToShow[index].pushed_at)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleImportButton(index)}
                        className="px-5 py-1 rounded bg-black text-white"
                      >
                        Import
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="hidden lg:flex items-center justify-center flex-1 rounded-lg ">
          <img className="h-72 rounded-xl object-contain" src={deployImg} />
        </div>
      </div>
    </main>
  );
}
