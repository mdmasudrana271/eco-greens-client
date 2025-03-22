import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const SellerDashboardHome = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    totalProducts: 0,
  });

  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchOrdersCount();
    fetchRevenueData();
    fetchAllOrders();
  }, []);

  // Fetch Orders API Call
  const fetchOrdersCount = async () => {
    try {
      const response = await fetch(
        "https://eco-greens.vercel.app/dashboard/seller/order-count/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setStats((prevStats) => ({
        ...prevStats,
        totalOrders: data.total_orders || 0,
        revenue: data.revenue || 0,
        totalProducts: data.total_products || 0,
      }));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(
        "https://eco-greens.vercel.app/dashboard/seller/orders/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`, // If using authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchRevenueData = async () => {
    try {
      const response = await fetch(
        "https://eco-greens.vercel.app/dashboard/seller/revenue/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`, // If using authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch revenue data");
      }

      const data = await response.json();
      const generateRandomColors = (length) => {
        const colors = [];
        for (let i = 0; i < length; i++) {
          const randomColor = `hsl(${Math.random() * 360}, 70%, 50%)`; // Random HSL color
          colors.push(randomColor);
        }
        return colors;
      };

      const colors = generateRandomColors(data.labels.length);

      setRevenueData({
        labels: data.labels, // Months (e.g., ['Jan 2024', 'Feb 2024'])
        datasets: [
          {
            label: "Revenue",
            data: data.datasets[0].data, // Revenue values per month
            backgroundColor: colors, // Set the color for the bars
            borderColor: "#388E3C", // Border color for the bars
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  // Chart Rendering
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new ChartJS(ctx, {
      type: "bar", // Change the chart type to 'bar' for vertical bars
      data: revenueData,
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
        scales: {
          x: {
            beginAtZero: true, // Ensure the x-axis starts at 0
            categoryPercentage: 0.8, // Adjust this value to control the space between bars
            barPercentage: 0.5,
          },
          y: {
            beginAtZero: true, // Ensure the y-axis starts at 0
          },
        },
      },
    });

    console.log(orders);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [revenueData]);
  return (
    <div>
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
            ৳{stats.revenue.toFixed(2)}
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

      {/* Revenue Over Time (Bar Chart) */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Revenue Over Time
        </h2>
        <div className="card m-4">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Recent Orders Section */}
      {orders.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 space-y-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Recent Orders
          </h2>
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-lg border-l-8 border-l-green-500 hover:shadow-xl transition-all duration-300"
              >
                {/* Left Section: Order Info */}
                <div className="w-full md:w-1/3 space-y-4 mb-4 md:mb-0">
                  <div className="text-lg font-semibold text-gray-800">
                    Order ID: {order.id}
                  </div>
                  <div className="text-sm text-gray-600">
                    Customer: {order.user_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    Phone: {order.phone}
                  </div>
                  <div className="text-sm text-gray-600">
                    Address: {order.address}
                  </div>
                  <div
                    className={`text-sm font-semibold rounded-full p-1 mt-2 inline-block ${
                      order.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "shipped"
                        ? "bg-blue-200 text-blue-800"
                        : order.status === "delivered"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>

                {/* Right Section: Products and Total Price */}
                <div className="w-full md:w-2/3 md:pl-6">
                  <div className="space-y-2">
                    {order.order_items.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-gray-700"
                      >
                        <div className="font-semibold">
                          {product.plant_name}
                        </div>
                        <div className="text-sm">
                          {product.quantity} x ৳{product.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Section: Total Price and Date */}
                  <div className="flex justify-between items-center mt-4 text-gray-800">
                    <div className="text-lg font-semibold">
                      Total: ৳{order.total_price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(order.order_date).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboardHome;
