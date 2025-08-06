import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-300 py-5 flex justify-between font-semibold">
      
        <div className="flex justify-center gap-8 pl-5 ">
          <Link to="/"> Home</Link>
          <Link to="/about"> About</Link>
          <Link to="/contact"> Contact</Link>
        </div>
        <div className=" pr-5">
          <Link to="/cart">Cart</Link>
        </div>
     
    </div>
  );
};

export default Navbar;
