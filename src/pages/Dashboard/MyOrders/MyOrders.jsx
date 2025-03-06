import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetch("https://eco-greens.vercel.app/orders/all_orders/", {
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Token ${localStorage.getItem("authToken")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrders(data.data);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    fetch("https://eco-greens.vercel.app/orders/all_orders/", {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setOrders([]); // Ensure it's always an array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]); // Set empty array on error
        setLoading(false);
      });
  }, []);
  console.log("orders: ", orders);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Helmet>
        <title>Eco Greens | My Orders</title>
      </Helmet>
      <div>
        <section>
          <h2 className="text-3xl font-bold">My Orders</h2>
          {orders.length > 0 ? (
            <div className="my-5">
              <div className="overflow-x-auto w-full rounded">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr
                        className={
                          index % 2 === 0
                            ? "bg-green-200 p-2"
                            : "bg-green-300 p-2"
                        }
                        key={item.id}
                      >
                        <td>
                          {item.order_items.map((product, index) => (
                            <p key={index}>{product.plant_name}</p>
                          ))}
                        </td>
                        <td>
                          {item.order_items.map((product, index) => (
                            <p key={index}>{product.quantity}</p>
                          ))}
                        </td>
                        <td>
                          {item.order_items.map((product, index) => (
                            <p key={index}>{product.price}৳</p>
                          ))}
                        </td>
                        <td>{item.total_price}</td>
                        <td>{item.status}</td>
                        <td>
                          {new Date(item.order_date).toLocaleString("en-US", {
                            weekday: "long", // "Monday"
                            year: "numeric", // "2025"
                            month: "long", // "January"
                            day: "numeric", // "27"
                            hour: "numeric", // "5"
                            minute: "numeric", // "11"
                            second: "numeric", // "7"
                            hour12: true, // "AM/PM"
                          })}
                        </td>
                        <th>
                          {item.status !== "pending" ? (
                            "Paid"
                          ) : (
                            <Link to={`/dashboard/payment/${item.id}`}>
                              <button className="btn btn-warning btn-xs">
                                Pay
                              </button>
                            </Link>
                          )}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-center  text-error">
              You have no orders
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default MyOrders;
