// src/components/layout/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { name: "Home", to: "/home" },
    { name: "Browse Skills", to: "/browse-skills" },
    { name: "My Swaps", to: "/my-swaps" },
    { name: "Swap Requests", to: "/swap-request" },
    { name: "Profile", to: "/profile" },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <nav className="flex flex-col space-y-4">
        {links.map(({ name, to }) => (
          <Link
            key={to}
            to={to}
            className={`block px-4 py-2 rounded hover:bg-purple-100 ${
              location.pathname === to ? "bg-purple-200 font-semibold" : "text-gray-700"
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
