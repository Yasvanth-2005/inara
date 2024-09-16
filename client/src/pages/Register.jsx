import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserActions } from "../store/userSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [username, setUsername] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "" || username === "") {
      setError("All Fileds Should be Filled");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        { email: email.toLowerCase(), password, username }
      );
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message);
      dispatch(UserActions.setUser(res.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-20 px-6 md:px-12 pb-6 w-full min-h-[100vh] flex items-center justify-center">
        <div className="bg-white rounded shadow-md px-5 py-4 w-full max-w-[420px]">
          <h1 className="text-center font-[500] text-2xl">Sign Up</h1>
          <form className="mt-5" onSubmit={handleSubmit}>
            {/* Email */}
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

            {/* Username */}
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="username" className="text-sm text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="outline-none border-b-2 border-black text-lg"
              />
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="mb-3 flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-sm text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                className="outline-none border-b-2 border-black text-lg"
              />
            </div>

            {error && (
              <p className="text-red-600 font-semibold mb-1">{error}</p>
            )}

            <div
              className="mb-1"
              onClick={() => setTermsAccepted((prev) => !prev)}
            >
              <input type="checkbox" id="terms" />
              <label
                className="pl-2 text-sm cursor-pointer"
                for="terms"
                checked={termsAccepted}
              >
                By signing up for Inara, you are agreeing to our{" "}
                <Link to="/sign_up_terms" className="text-blue-500">
                  Terms & Conditions
                </Link>
                .
              </label>
            </div>

            <div className="text-sm">
              Already have an Account?{" "}
              <Link to="/login" className="text-blue-500">
                Login Here
              </Link>
            </div>
            <button
              className="rounded text-white bg-blue-600 hover:bg-blue-700 px-10 mx-auto w-full mt-2 py-1.5"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
