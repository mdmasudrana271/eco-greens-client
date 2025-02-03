import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProviders";

const AllPlants = () => {
  //   const username = localStorage.getItem("username");
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/plants/plants-by-seller/?seller_username=${user.username}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/plants/details/${id}/`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
        } else {
          console.error(data.error);
        }
      });
  };

  return (
    <>
      <section>
        {products?.length === 0 ? (
          <p className="text-3xl mt-10 font-bold">You have no products</p>
        ) : (
          <>
            <h2 className="text-3xl font-bold">My Products</h2>
            <div className="my-5">
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Category</th>
                      <th>description</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={product?.img} alt="Product img" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{product?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{product?.price}</td>
                        <td>{product?.stock}</td>
                        <td>{product?.category}</td>
                        <td>
                          {product?.description
                            ? product.description
                                .split(" ")
                                .slice(0, 15)
                                .join(" ") +
                              (product.description.split(" ").length > 10
                                ? "..."
                                : "")
                            : ""}
                        </td>
                        <td>
                          {new Date(product.created_at).toLocaleString(
                            "en-US",
                            {
                              weekday: "long", // "Monday"
                              year: "numeric", // "2025"
                              month: "long", // "January"
                              day: "numeric", // "27"
                              hour: "numeric", // "5"
                              minute: "numeric", // "11"
                              second: "numeric", // "7"
                              hour12: true, // "AM/PM"
                            }
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-error"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AllPlants;
