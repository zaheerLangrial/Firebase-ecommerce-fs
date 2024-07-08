import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const navLink = (
    <ul className="flex space-x-3 font-medium text-base px-5">
      <Link to={"/"}>Home</Link>
      <Link to={"/allproducts"}>All Product</Link>
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/user-dashboard"}>Zaheer</Link>

      {/* <Link to={"/"}>Zaheer</Link>
      <Link to={"/"}>Admin</Link>
      <Link to={"/"}>Logout</Link>*/}
      <Link to={"/cart"}>Cart</Link>
    </ul>
  );
  return (
    <nav className="bg-pink-600 sticky top-0 z-50">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 text-white">
        <div className="py-3 lg:py-0">
          <Link to={"/"} className=" font-bold text-2xl text-center">
            E-Pak
          </Link>
        </div>
        <div className="flex justify-center mb-4 lg:mb-0">{navLink}</div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
