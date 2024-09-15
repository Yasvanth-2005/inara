import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import BookCard from "../components/BookCard";

const Profile = () => {
  const userData = useSelector((state) => state.user.user);
  const scrollRef = useRef(null);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: "smooth",
      });
    }
  };

  if (!userData) {
    return (
      <div className="pt-24 pb-8 w-full min-h-[100vh] flex items-center justify-center flex-col">
        <h1 className="text-xl font-semibold">Login to View Your Profile</h1>
        <Link to="/login?callback=/profile">
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-white rounded">
            Log In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-8 max-w-[1200px] mx-auto px-4 max-md:px-6">
      <div className="flex gap-4">
        <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden">
          {/* Image */}
          {userData.image !== "" ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${userData.image}`}
              className="w-full h-full"
              alt={userData.username}
            />
          ) : (
            <div className="w-full h-full text-5xl font-semibold flex items-center justify-center capitalize bg-[#EF375C] rounded-full text-white">
              {userData.username.charAt(0)}
            </div>
          )}
        </div>
        <div style={{ width: "calc(100% - 100px)" }}>
          <h1 className="text-3xl font-semibold">{userData.username}</h1>
          <h2 className="text-sm text-gray-600 mt-1">{userData.email}</h2>
          <h2 className="text-xl font-semibold">
            Wallet : ${userData.balance}
          </h2>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="my-2 font-semibold">{userData.bio}</h2>
        <Link to="/edit/profile">
          <h2 className="mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded w-[fit-content] cursor-pointer">
            Edit Profile
          </h2>
        </Link>
      </div>

      {/* Authors Profile */}
      <h2 className="mt-8 font-semibold text-2xl">Author Profile</h2>
      {userData && userData.authorId ? (
        <>
          <h2 className="mt-2 font-semibold text-xl">
            {userData.authorId.name}
          </h2>
          {" ( "}
          <span className="text-gray-700 font-semibold text-base">
            {userData.authorId.accolades.join(" , ")}
          </span>{" "}
          {")"}
          <h2 className="font-semibold mt-1 text-gray-800">
            {userData.authorId.publishion}
          </h2>
          <p className="font-semibold mt-2">{userData.authorId.bio}</p>
          <div className="flex gap-2 flex-wrap">
            <Link to="/add/book">
              <button className="text-white mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded">
                Add a Book
              </button>
            </Link>
            <Link to="/edit/author">
              <button className="text-white mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded">
                Edit Profile
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h5 className="text-lg mt-1 font-semibold">
            You Don't Have an Author's Account yet !!
          </h5>
          <Link to="/author/new">
            <button className="mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Create Author Profile
            </button>
          </Link>
        </>
      )}

      {/* Books Started Reading */}
      <h2 className="mt-8 font-semibold text-2xl">Continue Reading...</h2>

      {/* Books Saved */}
      {userData && userData.savedBooks.length > 0 && (
        <>
          <h2 className="mt-8 font-semibold text-2xl">Saved Books</h2>
          <div className="w-full flex gap-3 mt-5 items-stretch">
            <div
              onClick={handleScrollLeft}
              className="w-[50px] max-md:hidden bg-[#ecfeff] cursor-pointer hover:bg-[#cffafe] rounded flex items-center justify-center h-auto"
            >
              <FaAngleLeft />
            </div>
            <div
              ref={scrollRef}
              className="w-full flex gap-4 overflow-x-scroll scrollbarh"
            >
              {userData.savedBooks.map((b) => (
                <BookCard
                  key={b._id}
                  id={b._id}
                  publishion={b.author.publishion}
                  title={b.title}
                  image={b.image}
                  price={b.price}
                />
              ))}
            </div>
            <div
              onClick={handleScrollRight}
              className="w-[50px] max-md:hidden bg-[#ecfeff] cursor-pointer hover:bg-[#cffafe] rounded flex items-center justify-center h-auto"
            >
              <FaAngleRight />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
