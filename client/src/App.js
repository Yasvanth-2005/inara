import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import {
  About,
  BookPreview,
  Browse,
  CreateAuthor,
  CreateBook,
  EditAuthorProfile,
  EditProfile,
  Join,
  Login,
  PageNotFound,
  Profile,
  Register,
  Wallet,
} from "./pages";
import Header from "./components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./store/userSlice";
import Preloader from "./components/Preloader";
import { FaWifi } from "react-icons/fa";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (userStatus === "idle") {
      dispatch(fetchUser(token));
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (userError) {
      if (userError !== "Not Logged In") {
        toast.error(userError);
      }
      localStorage.removeItem("token");
    }
  }, [userError]);

  if (userError === "Internal Server Error" || userError === "Network Error") {
    return (
      <div className="w-full min-h-[100vh] py-24 bg-gray-100 flex items-center justify-center flex-col gap-2">
        <Header />
        <FaWifi size={36} />
        <h2 className="text-xl font-semibold">
          Check Your Internet Connection
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="text-white px-2 py-1.5 rounded bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="bg-gray-100 min-h-[100vh]">
      <ToastContainer />
      {userStatus === "loaded" ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/join" element={<Join />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/profile" element={<EditProfile />} />
            <Route path="/edit/author" element={<EditAuthorProfile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/author/new" element={<CreateAuthor />} />
            <Route path="/add/book" element={<CreateBook />} />
            <Route path="/book/:id" element={<BookPreview />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
}

export default App;
