import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaUsers, 
  FaBoxOpen, 
  FaListAlt, 
  FaShoppingCart,
  FaExclamationTriangle
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch dashboard statistics
        const statsResponse = await axios.get("http://localhost:5000/dashboard/stats");
        setStats(statsResponse.data);

        // Fetch recent orders
        const recentOrdersResponse = await axios.get("http://localhost:5000/dashboard/recent-orders");
        const formattedOrders = recentOrdersResponse.data.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          userName: order.user ? order.user.name : 'Unknown User',
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: new Date(order.createdAt).toLocaleDateString('id-ID')
        }));
        setRecentOrders(formattedOrders);

        // Fetch low stock products
        const lowStockResponse = await axios.get("http://localhost:5000/dashboard/low-stock");
        const formattedProducts = lowStockResponse.data.map(product => ({
          id: product.id,
          name: product.name,
          stock: product.stock,
          category: product.category ? product.category.name : 'Uncategorized'
        }));
        setLowStockProducts(formattedProducts);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-indigo-100 text-indigo-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUsers className="text-blue-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/users" className="text-blue-500 text-sm hover:underline">
              View all users →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaBoxOpen className="text-green-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Products</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalProducts}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/products" className="text-green-500 text-sm hover:underline">
              View all products →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaListAlt className="text-purple-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Categories</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalCategories}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/categories" className="text-purple-500 text-sm hover:underline">
              View all categories →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-full">
              <FaShoppingCart className="text-amber-500 text-xl" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalOrders}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/orders" className="text-amber-500 text-sm hover:underline">
              View all orders →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-sm">
                      <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4 border-b text-sm">{order.userName}</td>
                    <td className="py-3 px-4 border-b text-sm">{formatCurrency(order.totalAmount)}</td>
                    <td className="py-3 px-4 border-b text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b text-sm">{order.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {recentOrders.length > 0 ? (
            <div className="mt-4 text-right">
              <Link to="/orders" className="text-blue-500 text-sm hover:underline">
                View all orders →
              </Link>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No recent orders</p>
          )}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-amber-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Low Stock Alert</h2>
          </div>
          
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      {product.stock} left
                    </span>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Link to="/products" className="text-blue-500 text-sm hover:underline">
                  Manage inventory →
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No low stock products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
