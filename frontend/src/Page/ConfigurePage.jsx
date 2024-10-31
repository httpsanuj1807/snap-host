import { FaUserFriends } from "react-icons/fa";

export default function ConfigurePage() {
  return (
    <main>
      <div className="flex flex-col md:flex-row text-center md:text-left md:flex p-12">
        <div className="flex-1">
          <p className="text-3xl lg:text-5xl font-bold text-gray-900">
            Let's build something new.
          </p>
          <p className="py-2 font-mono text-slate-600">To deploy a new Project, import an existing <span className="text-black font-semibold">public</span> Git Repository</p>
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
    </main>
  );
}
