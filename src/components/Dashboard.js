import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-48 bg-blue-600 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-xl font-semibold">Admin</h1>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/users"
            className="block px-3 py-2 rounded hover:bg-blue-500 transition"
          >
            User
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 rounded hover:bg-blue-500 transition"
          >
            Product
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;