import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Payment = () => {
  const orders = useLoaderData();
  console.log(orders);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    postCode: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form Data Submitted:", formData);

    const payload = {
      address: formData.address,
      phone: formData.phone,
      postCode: formData.postCode,
      orderId: orders.id,
      totalPrice: orders.total_price,
    };

    // Example: Send data to backend
    fetch("https://eco-greens.onrender.com/payment/pay/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.status == "SUCCESS") {
          window.location.replace(data.data.GatewayPageURL);
        }
        // console.log("Response from payment:", response);
        // alert("Payment request submitted!");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
      <div
        className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x"
        bis_skin_checked="1"
      >
        <div className="py-6 md:py-0 md:px-6" bis_skin_checked="1">
          <h1 className="text-4xl font-bold">Payment</h1>
          <p className="pt-2 pb-4">Fill in the form to start payment</p>
          <div className="space-y-4" bis_skin_checked="1">
            <ul className="flex flex-col divide-y dark:divide-gray-300">
              {orders.order_items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col py-6 sm:flex-row sm:justify-between"
                >
                  <div
                    className="flex w-full space-x-2 sm:space-x-4 border border-green-400 p-5 rounded"
                    bis_skin_checked="1"
                  >
                    <div
                      className="flex flex-col justify-between w-full pb-4"
                      bis_skin_checked="1"
                    >
                      <div
                        className="flex justify-between w-full pb-2 space-x-2"
                        bis_skin_checked="1"
                      >
                        <div className="space-y-1" bis_skin_checked="1">
                          <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                            {item.plant_name}
                          </h3>
                          <p className="text-sm dark:text-gray-600">
                            {item.category}
                          </p>
                          <p className="text-sm dark:text-gray-600">
                            <span className="font-bold">Quantity:</span>{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <div className="text-left" bis_skin_checked="1">
                          <p className="text-lg font-semibold">
                            Price: {item.price}৳
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold">Total: {orders.total_price}৳</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
        >
          <label className="block">
            <span className="mb-1">Address</span>
            <input
              type="text"
              placeholder="Enter address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-green-600 dark:bg-gray-100"
            />
          </label>

          <label className="block">
            <span className="mb-1">Mobile Number</span>
            <input
              type="text"
              placeholder="Enter mobile number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
            />
          </label>

          <label className="block">
            <span className="mb-1">Post Code</span>
            <input
              type="text"
              placeholder="Enter post code"
              id="postCode"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100"
            />
          </label>
          <button
            type="submit"
            className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-green-600 dark:text-gray-50 focus:dark:ring-green-600 hover:dark:ring-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
