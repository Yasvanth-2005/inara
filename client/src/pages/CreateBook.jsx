import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserActions } from "../store/userSlice";
import { fetchBooks } from "../store/bookSlice";

const CreateBook = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [keywords, setKeywords] = useState("");
  const [genres, setGenres] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigate("/login?callback=add/book");
    }

    if (userData && !userData.authorId) {
      toast("You should have a author account to add books");
      navigate("/author/new");
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
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/books/new`,
        {
          title,
          author: userData.authorId._id,
          bookCover: image,
          price,
          summary,
          genres: genres.split(","),
          keywords: keywords.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Book Uploaded Successfully");
      dispatch(UserActions.addBook(res.data.book));
      dispatch(fetchBooks());
      navigate(`/book/${res.data.book._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] mx-auto">
      <h2 className="text-xl font-semibold">Add Your Book</h2>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form_group mb-5 flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-semibold">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of the book"
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* Image */}
          <div className="form_group mb-5 flex flex-col gap-2">
            <label htmlFor="image" className="text-sm font-semibold">
              Upload a Book Cover Image Here (less than 1mb)
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Selected Preview"
                className="mt-2 max-w-[240px]"
              />
            )}
          </div>

          {/* Price */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="price" className="text-sm font-semibold">
              Price *
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price of the Book"
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* Summary */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="summary" className="text-sm font-semibold">
              Summary
            </label>
            <textarea
              id="summary"
              rows="3"
              value={summary}
              placeholder="Summary of the Book"
              onChange={(e) => setSummary(e.target.value)}
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            ></textarea>
          </div>

          {/* Genres */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="genres" className="text-sm font-semibold">
              Genres
            </label>
            <input
              type="text"
              id="genres"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              placeholder="Genres of Book separated by ','"
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* Keywords */}
          <div className="form_group mb-4 flex flex-col gap-2">
            <label htmlFor="keywords" className="text-sm font-semibold">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keywords for Book separated by ','"
              className="bg-transparent border border-1 rounded-sm p-2 border-gray-600"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
