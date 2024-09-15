import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserActions } from "../store/userSlice";

const CreateAuthor = () => {
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [publishion, setPublishion] = useState("");
  const [accolades, setAccolades] = useState("");
  const [walletId, setWalletId] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (name === "" || publishion === "" || walletId === "") {
      setLoading(false);
      toast.error("All Fields with * are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/author`,
        {
          name,
          publishion,
          bio,
          accolades: accolades.split(","),
          walletId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Author Account Created Successfully");
      dispatch(UserActions.setAuthor(res.data.author));
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate("/login?callback=/author/new");
    }

    if (userData && userData.authorId) {
      navigate("/profile");
    }
  }, [userData, navigate]);

  return (
    <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] mx-auto">
      <h2 className="text-xl font-semibold">Create Author Profile</h2>
      <h2 className="mt-2">
        <span className="font-semibold">Note:</span> before creating your
        Inara's author profile, you must have your Dropp's Account ID. If you
        don't have a wallet yet, please follow these links to create one.
      </h2>
      <h2 className="mt-2">
        <span className="font-semibold">App Store :- </span>
        <a
          href="https://apps.apple.com/us/app/dropp-cc/id1544894404"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          https://apps.apple.com/us/app/dropp-cc/id1544894404
        </a>
      </h2>
      <h2 className="mt-2">
        <span className="font-semibold">Google Play Store :- </span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://play.google.com/store/apps/details?id=cc.dropp.wallet"
          className="text-blue-500 underline"
        >
          https://play.google.com/store/apps/details?id=cc.dropp.wallet
        </a>
      </h2>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Author Name"
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* Publishion */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="publishion" className="text-sm font-semibold">
              Publishion Name *
            </label>
            <input
              type="text"
              value={publishion}
              id="publishion"
              placeholder="Publishion Name"
              onChange={(e) => setPublishion(e.target.value)}
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* bio */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-semibold">
              Bio
            </label>
            <textarea
              id="bio"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            ></textarea>
          </div>

          {/* accolades */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="accolades" className="text-sm font-semibold">
              Accolades
            </label>
            <input
              type="text"
              id="accolades"
              value={accolades}
              placeholder="Accolades sepeated by ','"
              onChange={(e) => setAccolades(e.target.value)}
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* Wallet Id */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="wallet" className="text-sm font-semibold">
              Wallet Id *
            </label>
            <input
              type="text"
              id="wallet"
              value={walletId}
              placeholder="Dropp Wallet Id"
              onChange={(e) => setWalletId(e.target.value)}
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuthor;
