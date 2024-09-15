import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login?callback=/wallet");
    }
  }, [userData, navigate]);

  return (
    <div className="pt-24 pb-8 px-6 max-md:px-4 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-semibold">Wallet</h1>
      <h1 className="text-xl mt-2 font-semibold">
        Balance :- {userData && userData.balance}
      </h1>
      <button className="mt-2 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded">
        Top up Balance
      </button>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold">Transaction History</h1>
      </div>
    </div>
  );
};

export default Wallet;
