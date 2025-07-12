import React from "react";
import { Heart, ShoppingCart, User, Search } from "lucide-react";

const FloatingNav = () => {


  return (
    <>
      {/* Logo top-left */}
      <div className="fixed top-4 left-4 z-50">
        <div className="text-2xl font-extrabold text-gray-800 tracking-wide select-none">
          Virtual<span className="text-blue-600">Store</span>
        </div>
      </div>

      {/* Search bar centered horizontally */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[60%] max-w-xl bg-white shadow-lg rounded-full px-6 py-2 border border-gray-200 flex items-center">
        <Search className="w-5 h-5 text-gray-500 mr-3" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent focus:outline-none w-full text-sm text-gray-700"
        />
      </div>

      {/* Icons each in separate circles, grouped top-right */}
      <div className="fixed top-4 right-4 z-50 flex space-x-4">
        {/* Wishlist */}
        <button
          aria-label="Wishlist"
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-pink-600 hover:shadow-lg transition"
        >
          <Heart className="w-6 h-6" />
        </button>

        {/* Cart */}
        <button
          aria-label="Cart"
          className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-blue-600 hover:shadow-lg transition"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            3
          </span>
        </button>

        {/* Profile */}
        <button
          aria-label="Profile"
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:text-gray-900 hover:shadow-lg transition"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
      
    </>
  );
};

export default FloatingNav;
