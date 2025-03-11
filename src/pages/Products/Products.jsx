// import { useEffect, useState } from "react";
// import Spinner from "../../components/Spinner/Spinner";
// import { Link } from "react-router-dom";

// const Products = () => {
//   const [plants, setPlants] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1); // Track the current page
//   const [totalPages, setTotalPages] = useState(0); // Track the total number of pages
//   const [pageSize, setPageSize] = useState(5);

//   useEffect(() => {
//     fetch("https://eco-greens.vercel.app/categories/list/", {
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data);
//       });
//   }, []);

//   useEffect(() => {
//     fetchEvent();
//   }, [currentPage, pageSize]);

//   const fetchEvent = (cate = "") => {
//     setLoading(true);
//     let url = `https://eco-greens.vercel.app/plants/all/?page=${currentPage}&page_size=${pageSize}`;
//     if (cate) {
//       url += `&category=${cate}`;
//     }

//     fetch(url, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setPlants(data?.results?.data || []);
//         setTotalPages(data?.count ? Math.ceil(data.count / pageSize) : 0);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.message);
//         setLoading(false);
//       });
//   };

//   console.log("all plants: ", plants);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handlePageSizeChange = (e) => {
//     setPageSize(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page when pageSize changes
//   };

//   if (loading) {
//     return <Spinner></Spinner>;
//   }

//   return (
//     <>
//       <div className="mx-5 bg-gray-100 p-4 rounded">
//         <h3 className="text-xl font-bold p-2">Category</h3>
//         <div className="relative w-full border rounded shadow flex items-center gap-4 p-3 md:p-6 overflow-x-auto">
//           {categories.map((cat) => (
//             <div key={cat.id} className="text-xs md:text-xl ">
//               <button
//                 className="btn bg-green-200 px-2 py-1"
//                 onClick={() => fetchEvent(cat.id)}
//               >
//                 {cat.name}
//               </button>
//             </div>
//           ))}
//         </div>
//         <div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
//           {plants.map((plant) => (
//             <div
//               key={plant.id}
//               className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
//             >
//               <img
//                 src={plant?.img}
//                 alt=""
//                 className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
//               />
//               <div className="flex flex-col justify-between p-6 space-y-8">
//                 <div className="space-y-2">
//                   <h3 className="text-xl font-semibold tracking-wide h-16">
//                     {plant?.name}
//                   </h3>
//                   <h2 className="text-md text-black font-bold">
//                     {plant?.price}৳
//                   </h2>
//                   <p className="dark:text-gray-800">
//                     {plant?.category_name || "No Category"}
//                   </p>
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded bg-green-500 dark:text-gray-50"
//                 >
//                   <Link to={`/details/${plant.id}`}>Details</Link>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="md:flex items-center justify-between">
//           {/* Page Size Dropdown */}
//           <div className="flex justify-center items-center my-5 gap-5">
//             <label htmlFor="pageSize" className="">
//               Items per page:
//             </label>
//             <select
//               id="pageSize"
//               value={pageSize}
//               onChange={handlePageSizeChange}
//               className="px-4 py-2 border rounded-md"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//             </select>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex flex-wrap justify-center">
//             {/* Previous Button */}
//             <button
//               disabled={currentPage === 1} // Disable if on the first page
//               onClick={() => handlePageChange(currentPage - 1)}
//               className={`btn bg-green-600 dark:text-gray-50 ${
//                 currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
//               }`}
//             >
//               Previous
//             </button>

//             {/* Page number buttons */}
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={`btn ${
//                   currentPage === index + 1 ? "bg-green-700" : "bg-green-400"
//                 } text-white rounded-md mx-1 hover:bg-green-700 focus:outline-none`}
//               >
//                 {index + 1}
//               </button>
//             ))}

//             {/* Next Button */}
//             <button
//               disabled={currentPage === totalPages} // Disable if on the last page
//               onClick={() => handlePageChange(currentPage + 1)}
//               className={` btn bg-green-600 dark:text-gray-50 ${
//                 currentPage === totalPages
//                   ? "cursor-not-allowed opacity-50"
//                   : ""
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;

import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const Products = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://eco-greens.vercel.app/categories/list/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [currentPage, pageSize]);

  const fetchPlants = () => {
    setLoading(true);
    let url = `https://eco-greens.vercel.app/plants/all/?page=${currentPage}&page_size=${pageSize}`;
    if (selectedCategory) url += `&category=${selectedCategory}`;
    if (searchQuery) url += `&name=${searchQuery}`;

    fetch(url)
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
  console.log(searchQuery);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPlants();
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when pageSize changes
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-start">
        Discover Our Plants
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search plants..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Plants Grid */}
      {plants.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10">
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
              >
                <img
                  src={plant?.img}
                  alt={plant?.name}
                  className="w-full h-56 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-4 text-gray-800 h-16">
                  {plant?.name}
                </h3>
                <p className="text-green-600 font-bold text-xl">
                  {plant?.price}৳
                </p>
                <p className="text-gray-500 text-sm">
                  {plant?.category_name || "No Category"}
                </p>
                <Link
                  to={`/details/${plant.id}`}
                  className="block text-center bg-green-500 text-white px-5 py-3 mt-4 rounded-md hover:bg-green-700 transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-800 text-2xl font-semibold mt-5">
          No plants found
        </p>
      )}
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
        <div className="flex flex-wrap justify-center">
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
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
