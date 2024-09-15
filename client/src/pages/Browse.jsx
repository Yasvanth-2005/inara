import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/bookSlice";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import BookCard from "../components/BookCard";
import bookImg from "../assets/book.svg";

const Browse = () => {
  const dispatch = useDispatch();
  const booksData = useSelector((state) => state.books.books);
  const bookStatus = useSelector((state) => state.books.status);
  const bookError = useSelector((state) => state.books.error);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [bookLoading, setBookLoading] = useState(true);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  useEffect(() => {
    if (bookStatus === "loaded") {
      setBookLoading(false);
    }
  }, [bookStatus]);

  useEffect(() => {
    if (bookError) {
      toast.error(bookError);
      setBookLoading(false);
    }
  }, [bookError]);

  useEffect(() => {
    if (booksData && booksData.length > 0) {
      setFilteredBooks(booksData);
    }
  }, [booksData]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    setBookLoading(true);

    if (query === "") {
      setFilteredBooks(booksData);
      setBookLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/books/search/${query}`
      );
      setFilteredBooks(res.data.books);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setBookLoading(false);
    }
  };

  if (bookLoading || bookStatus !== "loaded") {
    return (
      <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1200px] mx-auto">
        <div className="mb-6 relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full bg-transparent text-lg border border-gray-500 rounded px-2 py-1.5"
            placeholder="Search Here"
          />
          <div className="absolute right-0 bottom-0 px-2 py-1.5 w-[42px] flex items-center justify-center cursor-pointer h-[42px] border border-gray-500 rounded text-xl bg-white">
            <CiSearch />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Latest Books</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-full mb-4 flex items-center justify-center"
            >
              <div className="w-[260px] p-4 bg-white rounded flex gap-2 flex-col">
                <Skeleton className="h-[260px]" />
                <Skeleton count={3} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (bookError) {
    return (
      <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1200px] mx-auto">
        <h1 className="text-xl font-semibold text-center">{bookError}</h1>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1200px] mx-auto">
      <div className="mb-6 relative">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full bg-transparent text-lg border border-gray-500 rounded px-2 py-1.5"
          placeholder="Search Here"
        />
        <div className="absolute right-0 bottom-0 px-2 py-1.5 w-[42px] flex items-center justify-center cursor-pointer h-[42px] border border-gray-500 rounded text-xl bg-white">
          <CiSearch />
        </div>
      </div>
      <h2 className="text-xl font-semibold">Latest Books</h2>
      {filteredBooks.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBooks.map((b) => (
            <BookCard
              id={b._id}
              publishion={b.author.publishion}
              title={b.title}
              image={b.image}
              price={b.price}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex h-[400px] items-center justify-center flex-col gap-1">
          <img
            alt="book not found"
            src={bookImg}
            className="w-[170px] h-[170px]"
          />
          <h1 className="font-semibold text-2xl">No Books Found</h1>
        </div>
      )}
    </div>
  );
};

export default Browse;
