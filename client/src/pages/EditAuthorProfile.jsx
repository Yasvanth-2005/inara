import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { UserActions } from "../store/userSlice";

const EditAuthorProfile = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bio, setBio] = useState(
    userData && userData.authorId ? userData.authorId.bio : ""
  );
  const [accolades, setAccolades] = useState(
    userData && userData.authorId ? userData.authorId.accolades.join(",") : ""
  );

  const [walletId, setWalletId] = useState(
    userData && userData.authorId ? userData.authorId.walletId : ""
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/author/edit`,
        {
          authorId: userData.authorId._id,
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

      toast.success("Author Profile updated successfully!");
      dispatch(UserActions.setAuthor(res.data.author));
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] mx-auto">
        <h2 className="text-xl font-semibold">Edit Author Profile</h2>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
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
            <div className="form_group mb-4 flex flex-col gap-2">
              <label htmlFor="accolades" className="text-sm font-semibold">
                Accolades
              </label>
              <input
                type="text"
                id="accolades"
                value={accolades}
                onChange={(e) => setAccolades(e.target.value)}
                placeholder="Accolades separated by ','"
                className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
              />
            </div>
            <div className="form_group mb-4 flex flex-col gap-2">
              <label htmlFor="wallet" className="text-sm font-semibold">
                Wallet Id
              </label>
              <input
                type="text"
                id="wallet"
                value={walletId}
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
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAuthorProfile;
