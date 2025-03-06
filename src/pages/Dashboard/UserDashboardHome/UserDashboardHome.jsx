import { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarElement, // Import BarElement for bar charts
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarElement, // Register BarElement for bar charts
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const UserDashboardHome = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCost: 0,
  });

  const [orderData, setOrderData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchOrdersCount();
    fetchOrderData();
  }, []);

  // Fetch Orders API Call
  const fetchOrdersCount = async () => {
    try {
      const response = await fetch(
        "https://eco-greens.vercel.app/dashboard/user/order-count/",
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
      setStats({
        totalOrders: data.total_orders || 0,
        totalCost: data.total_cost || 0,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch Order Data for Chart
  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        "https://eco-greens.vercel.app/dashboard/user/order-data/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
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
      setOrderData({
        labels: data.labels, // Months (e.g., ['Jan 2024', 'Feb 2024'])
        datasets: [
          {
            label: "Total Orders",
            data: data.datasets[0].data, // Orders per month
            borderColor: colors, // Set the border color for the bars
            backgroundColor: "rgba(255, 152, 0, 0.6)", // Set the background color for the bars
            fill: false, // No fill below bars (not needed for bar chart)
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching order data:", error);
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
      type: "bar", // Change chart type to bar
      data: orderData,
      options: {
        responsive: true,
        plugins: { legend: { position: "top" } },
        scales: {
          x: {
            beginAtZero: true, // Ensure x-axis starts at 0
            title: { display: true, text: "Months" },
          },
          y: {
            beginAtZero: true, // Ensure y-axis starts at 0
            title: { display: true, text: "Orders" },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [orderData]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        User Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalOrders}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Cost</h2>
          <p className="text-3xl font-bold text-green-600">
            ৳{stats.totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Orders Over Time (Bar Chart) */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Orders Over Time
        </h2>
        <div className="card m-4">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
