import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUsers, FaBoxOpen, FaListAlt, FaTruck, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/users", name: "Users", icon: <FaUsers /> },
    { path: "/products", name: "Products", icon: <FaBoxOpen /> },
    { path: "/categories", name: "Categories", icon: <FaListAlt /> },
    { path: "/expeditions", name: "Expeditions", icon: <FaTruck /> },
    { path: "/orders", name: "Orders", icon: <FaShoppingCart /> },
  ];

  return (
    <div className="flex h-screen">
      <aside 
        className="w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white flex flex-col shadow-lg"
      >
        <nav className="flex flex-col p-2 flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-start px-4 py-3 my-1 rounded-lg transition-all duration-200
                ${isActive(item.path) 
                  ? 'bg-white text-blue-700 font-medium shadow-md' 
                  : 'text-white hover:bg-blue-500/50'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SideBar;