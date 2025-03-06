import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required chart.js components
ChartJS.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 100,
    revenue: 500,
    totalProducts: 430,
  });

  const [revenueData, setRevenueData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch data from the API
  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("/api/seller/orders");
    const data = await response.json();

    setOrders(data);
    setStats((prevStats) => ({
      ...prevStats,
      totalOrders: data.length,
      revenue: data.reduce((acc, order) => acc + order.total_price, 320),
    }));

    // Calculate revenue per month for the graph
    const monthlyRevenue = {};
    data.forEach((order) => {
      const month = new Date(order.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total_price;
    });

    const sortedMonths = Object.keys(monthlyRevenue).sort();
    const revenueValues = sortedMonths.map((month) => monthlyRevenue[month]);

    setRevenueData({
      labels: sortedMonths,
      datasets: [
        {
          label: "Revenue",
          data: revenueValues,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          fill: true,
        },
      ],
    });
  };

  const fetchProducts = async () => {
    const response = await fetch("/api/seller/products");
    const data = await response.json();

    setProducts(data);
    setStats((prevStats) => ({
      ...prevStats,
      totalProducts: data.length,
    }));
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: revenueData,
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [revenueData]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Seller Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalOrders}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-600">
            ${stats.revenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalProducts}
          </p>
        </div>
      </div>

      {/* Revenue Over Time (Line Chart) */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Revenue Over Time
        </h2>
        <div className="card m-4">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Recent Orders
        </h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Total</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border hover:bg-gray-50 transition">
                <td className="border p-3">{order.id}</td>
                <td className="border p-3">
                  <span
                    className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border p-3">${order.total_price}</td>
                <td className="border p-3">
                  <Link
                    to={`/seller/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
