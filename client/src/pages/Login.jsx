import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserActions } from "../store/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const callbackUrl = query.get("callback") || "/";

  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  useEffect(() => {
    if (userData) {
      navigate(callbackUrl);
    }
  }, [userData, navigate, callbackUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("All Fileds Should be Filled");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        { email: email.toLowerCase(), password }
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in Successfully");
      dispatch(UserActions.setUser(res.data.user));
      navigate(callbackUrl);
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 px-6 md:px-12 pb-6 w-full min-h-[100vh] flex items-center justify-center">
      <div className="bg-white rounded shadow-md px-5 py-4 w-full max-w-[420px]">
        <h1 className="text-center font-[500] text-2xl">Log in to Inara</h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border-b-2 border-black text-lg"
            />
          </div>
          <div className="mb-3 flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border-b-2 border-black text-lg"
            />
            <div
              onClick={() => setShowPassword((p) => !p)}
              className="absolute z-2 right-0 bottom-[1px] h-[30px] w-[35px] cursor-pointer flex items-center justify-center bg-slate-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="pt-2 text-sm">
            Didnt have an Account?{" "}
            <Link to="/register" className="text-blue-500">
              Register Here
            </Link>
          </div>
          <button
            className="rounded text-white bg-blue-600 hover:bg-blue-700 px-10 mx-auto w-full mt-2 py-1.5"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In....." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
