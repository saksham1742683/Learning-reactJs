import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/search/searchSlice";
import LogoutButton from "./LogoutButton";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value);

  const auth = getAuth();
  const user = auth.currentUser; // Firebase current user

  return (
    <div className="bg-gray-300 py-5 flex justify-between font-semibold">
      <div className="flex justify-center gap-8 pl-5 ">
        <Link to="/"> Home</Link>
        <Link to="/about"> About</Link>
        <Link to="/contact"> Contact</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search Item"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className=" text-white px-15 font-semibold py-1 bg-gray-400 rounded-2xl "
        />
      </div>
      <div className=" pr-5 flex  gap-5">
        <Link to="/cart" className="bg-red-300">
          Cart
        </Link>
        {user && <LogoutButton />}
        {!user && (
          <Link className=" bg-amber-600" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
