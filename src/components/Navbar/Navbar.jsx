import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartProducts = useSelector(state => state.cart)
  const navLink = (
    <ul className="flex space-x-3 font-medium text-base px-5">
      <Link to={"/"}>Home</Link>
      <Link to={"/allproducts"}>All Product</Link>
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/user-dashboard"}>Zaheer</Link>

      <Link to={"/admin-dashboard"}>Admin</Link>
      <Link to={"/cart"}>Cart({cartProducts?.length})</Link>
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
