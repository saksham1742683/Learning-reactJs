import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/search/searchSlice";
import LogoutButton from "./LogoutButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "../features/auth/authSlice";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.value);
  const user = useSelector((state) => state.auth.user);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            emailVerified: currentUser.emailVerified,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <nav className="bg-gray-900 py-4 px-5 font-semibold text-white">
      <div className="flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>

        {/* Search Input (hidden on mobile) */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search Item"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="text-white px-4 py-1 bg-gray-400 rounded-2xl"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/cart" className="bg-red-300 p-2 rounded">
            <FaShoppingCart size={20} />
          </Link>
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              className="bg-amber-600 px-3 py-1 rounded text-white"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-3 md:hidden">
          <input
            type="text"
            placeholder="Search Item"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="text-white px-4 py-1 bg-gray-400 rounded-2xl"
          />

          <Link to="/cart" className="bg-red-300 p-2 rounded inline-flex w-fit">
            <FaShoppingCart size={20} />
          </Link>
          {user ? (
            <LogoutButton />
          ) : (
            <Link
              className="bg-amber-600 px-3 py-1 rounded text-white w-fit"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
