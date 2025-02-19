import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProviders";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Spinner from "../../../components/Spinner/Spinner";

const AllPlants = () => {
  //   const username = localStorage.getItem("username");
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://eco-greens.vercel.app/plants/plants-by-seller/?page=${currentPage}&page_size=${pageSize}&seller_username=${user.username}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.results || []);
        setTotalPages(data?.count ? Math.ceil(data.count / pageSize) : 0);
        setLoading(false);
      });
  }, [currentPage, pageSize]);

  console.log(products);

  const handleDelete = (id) => {
    fetch(`https://eco-greens.vercel.app/plants/details/${id}/`, {
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when pageSize changes
  };

  // if (loading) {
  //   return <Spinner></Spinner>;
  // }

  return (
    <>
      <Helmet>
        <title>Eco Greens | My Plants</title>
      </Helmet>
      <section>
        {products?.length === 0 ? (
          <p className="text-xl text-center text-error mt-10 font-bold">
            You have no products
          </p>
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
                  {loading ? (
                    <Spinner></Spinner>
                  ) : (
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
                          <td>{product?.category_name}</td>
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
                              className="btn btn-error text-white"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                <div className="md:flex items-center justify-between">
                  {/* Page Size Dropdown */}
                  <div className="flex justify-center items-center my-5 gap-5">
                    <label htmlFor="pageSize" className="">
                      Items per page:
                    </label>
                    <select
                      id="pageSize"
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      className="px-4 py-2 border rounded-md"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </select>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex justify-center">
                    {/* Previous Button */}
                    <button
                      disabled={currentPage === 1} // Disable if on the first page
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={`btn bg-green-600 dark:text-gray-50 ${
                        currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page number buttons */}
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn ${
                          currentPage === index + 1
                            ? "bg-green-700"
                            : "bg-green-400"
                        } text-white rounded-md mx-1 hover:bg-green-700 focus:outline-none`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      disabled={currentPage === totalPages} // Disable if on the last page
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={` btn bg-green-600 dark:text-gray-50 ${
                        currentPage === totalPages
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default AllPlants;
