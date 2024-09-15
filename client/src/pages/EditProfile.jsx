import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { UserActions } from "../store/userSlice";

const EditProfile = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bio, setBio] = useState(
    userData && userData.bio !== "" ? userData.bio : ""
  );

  const [favGenres, setFavGenres] = useState(
    userData && userData.favGenres && userData.favGenres.length !== 0
      ? userData.favGenres.join(",")
      : ""
  );

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 1000000;

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast.error("The image file size exceeds 1 MB");
        return;
      }

      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/edit`,
        {
          image,
          bio,
          favGenres: favGenres.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");
      dispatch(UserActions.setUser(res.data.user));
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] mx-auto">
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="image" className="text-sm font-semibold">
              Upload an Image Here (less than 1mb)
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Selected Preview"
                className="mt-2 max-h-60 max-w-60"
              />
            )}
          </div>
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
            <label htmlFor="genres" className="text-sm font-semibold">
              Fav Genres
            </label>
            <input
              type="text"
              id="genres"
              value={favGenres}
              onChange={(e) => setFavGenres(e.target.value)}
              placeholder="Write your fav genres separated by ','"
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
  );
};

export default EditProfile;
