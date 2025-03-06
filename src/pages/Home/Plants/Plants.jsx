import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch("https://eco-greens.vercel.app/categories/list/", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    fetchEvent();
  }, [currentPage, pageSize]);

  const fetchEvent = (cate = "") => {
    setLoading(true);
    let url = `https://eco-greens.vercel.app/plants/all/?page=${currentPage}&page_size=${pageSize}`;
    if (cate) {
      url += `&category=${cate}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlants(data?.results?.data || []);
        setTotalPages(data?.count ? Math.ceil(data.count / pageSize) : 0);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
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

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <div className="mx-5 bg-gray-100 p-4 rounded">
        <h3 className="text-xl font-bold p-2">Category</h3>
        <div className="relative w-full border rounded shadow flex items-center gap-4 p-3 md:p-6 overflow-x-auto">
          {categories.map((cat) => (
            <div key={cat.id} className="text-xs md:text-xl ">
              <button
                className="btn bg-green-200 px-2 py-1"
                onClick={() => fetchEvent(cat.id)}
              >
                {cat.name}
              </button>
            </div>
          ))}
        </div>
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <img
                src={plant?.img}
                alt=""
                className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
              />
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-wide h-16">
                    {plant?.name}
                  </h3>
                  <h2 className="text-md text-black font-bold my-4">
                    {plant?.price}৳
                  </h2>
                  <p className="dark:text-gray-800">
                    {plant?.category_name || "No Category"}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded bg-green-500 dark:text-gray-50"
                >
                  <Link to={`/details/${plant.id}`}>Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>

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
                  currentPage === index + 1 ? "bg-green-700" : "bg-green-400"
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
    </>
  );
};

export default Plants;
