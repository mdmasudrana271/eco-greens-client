import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProviders";
import toast from "react-hot-toast";
import { CartContext } from "../../../context/CartContext";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    // Calculate the total price whenever the cart items change
    const totalPrice = cart.reduce(
      (accum, item) => accum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleOrderNow = () => {
    const orderItems = cart.map((item) => ({
      plant: item.id,
      quantity: item.quantity,
      price: item.price * item.quantity,
    }));

    const orderData = {
      order_items: orderItems,
      address: user.address,
      phone: user.mobile_no,
    };

    fetch("https://eco-greens.onrender.com/orders/place_order/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success(data.message);
          clearCart();
          navigate("/dashboard/orders");
        } else {
          toast.error(data.error);
        }
      });
  };
  console.log(cart);
  return (
    <>
      <Helmet>
        <title>Eco Greens | Cart</title>
      </Helmet>
      <div
        className="flex flex-col  p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800"
        bis_skin_checked="1"
      >
        <h2 className="text-4xl text-green-700 font-bold">Your cart</h2>
        {cart.length > 0 ? (
          <ul className="flex flex-col divide-y dark:divide-gray-300">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col py-6 sm:flex-row sm:justify-between"
              >
                <div
                  className="flex w-full space-x-2 sm:space-x-4 border border-green-400 p-5 rounded"
                  bis_skin_checked="1"
                >
                  <img
                    className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                    src={item?.img}
                    alt="plant image"
                  />
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
                          {item.name}
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
                        <p className="text-xs font-semibold">
                          Subtotal: {item.price * item.quantity}৳
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm divide-x" bis_skin_checked="1">
                      <button
                        onClick={() => removeFromCart(item.id, item.user)}
                        type="button"
                        className="flex items-center px-2 py-1 pl-0 space-x-1"
                      >
                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Cart Is Empty</p>
        )}

        <div className="space-y-1 text-right" bis_skin_checked="1">
          <p>
            Total amount:
            <span className="font-semibold">{total}৳</span>
          </p>
        </div>
        <div className="flex justify-end space-x-4" bis_skin_checked="1">
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:border-green-600"
          >
            <Link to="/products">Back to shop</Link>
          </button>
          <button
            onClick={handleOrderNow}
            type="button"
            className="px-6 py-2 border rounded-md bg-green-600 dark:text-gray-50 border-green-600"
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
