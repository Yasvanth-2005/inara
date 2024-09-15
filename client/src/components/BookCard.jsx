import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ id, title, image, publishion, price }) => {
  return (
    <div key={id} className="w-full mb-4 flex justify-center">
      <Link to={`/book/${id}`}>
        <div className="w-[260px] pb-2 rounded bg-white flex gap-2 flex-col items-center justify-center shadow-lg">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${image}`}
            alt={title}
            className="w-full h-auto object-cover rounded"
          />
          <div className="flex flex-col items-center">
            <h1
              className="text-xl mb-0 pb-0 font-semibold text-center"
              style={{ lineHeight: "1.25rem" }}
            >
              {title}
            </h1>
            <h2 className="font-semibold mt-1">{publishion}</h2>
            <span className="text-sm text-gray-500">Value: ${price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
