import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookImg from "../assets/book.svg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserActions } from "../store/userSlice";

const BookPreview = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.user);
  const [bookSaved, setBookSaved] = useState(false);

  useEffect(() => {
    const checkIfBookSaved = () => {
      if (userData) {
        const isSaved = userData.savedBooks.some(
          (savedBook) => savedBook._id === id
        );
        setBookSaved(isSaved);
      }
    };

    checkIfBookSaved();
  }, [userData, id]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/books/get/${id}`
        );
        setBook(response.data.book);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleSaving = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userData) {
      setLoading(false);
      toast.error("Login to Save a Book");
      navigate(`/login?callback=/book/${id}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/books/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(UserActions.addSavedBook(book));
      toast.success("Book Saved Successfully");
      setBookSaved(true); // Update state to reflect the change
    } catch (error) {
      toast.error("Book Saving Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/books/remove/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(UserActions.removeSavedBook(id));
      toast.success("Book Removed Successfully");
      setBookSaved(false);
    } catch (error) {
      toast.error("Book Removing Failed");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] mx-auto">
        <div className="max-w-[300px]">
          <Skeleton height={200} />
        </div>
        <Skeleton count={6} />
        <div className="max-w-[200px]">
          <Skeleton height={50} />
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] min-h-[100vh] mx-auto flex items-center justify-center flex-col">
        <img src={bookImg} alt="Books" className="w-[100px] h-[100px]" />
        <h1 className="text-2xl font-semibold">Book not Found</h1>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-3 px-6 max-md:px-4 max-w-[1000px] mx-auto">
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${book.image}`}
        alt={book.title}
        className="max-h-[250px]"
      />
      <h1 className="font-semibold text-2xl mt-3">{book.title}</h1>
      <h1 className="font-semibold text-lg">{book.author.publishion}</h1>
      <p className="font-semibold text-gray-600">Author : {book.author.name}</p>
      <p className="mt-1 font-semibold">{book.summary}</p>
      <h1 className="font-semibold mt-2 text-lg">Value : ${book.price}</h1>
      <h1 className="font-semibold text-lg">
        Publishion Date : {book.createdAt.substring(0, 10)}
      </h1>
      <h1 className="font-semibold text-lg">
        Genres : {book.genres.join(" , ")}
      </h1>
      <h1 className="font-semibold text-lg">
        Keywords : {book.keywords.join(" , ")}
      </h1>
      <div className="flex mt-4 flex-wrap items-center gap-4">
        <button className="px-3 py-1.5 text-white rounded bg-blue-600 hover:bg-blue-700">
          Read Now
        </button>

        <button
          className={`px-3 py-1.5 text-white rounded ${
            bookSaved
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={bookSaved ? handleRemoveBook : handleSaving}
        >
          {loading
            ? bookSaved
              ? "Removing...."
              : "Saving..."
            : bookSaved
            ? "Remove from Saved Books"
            : "Save Now"}
        </button>
      </div>
    </div>
  );
};

export default BookPreview;
