import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-2">
      <h1 className="text-7xl text-[#EF375C] font-bold">
        4<span className="text-black">0</span>4
      </h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <Link to="/">
        <button className="bg-[#EF375C] hover:bg-red-500 px-2 py-1.5 rounded text-white">
          Return To Home
        </button>
      </Link>
    </div>
  );
};

export default PageNotFound;
