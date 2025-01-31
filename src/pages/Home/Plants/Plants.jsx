import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);

  // const [cate, setCate] = useState("");
  //   useEffect(() => {
  //     fetch("http://127.0.0.1:8000/plants/list/", {
  //       headers: {
  //         "content-type": "application/json",
  //         // authorization: `Token ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPlants(data);
  //       });
  //   }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/list/", {
      headers: {
        "content-type": "application/json",
        // authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = (cate = "") => {
    let url = `http://127.0.0.1:8000/plants/all/`;
    if (cate) {
      url += `?category=${cate}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // const pendingRequests = data.filter(
        //   (request) => request.status === "pending"
        // );
        setPlants(data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //   const handleFilter = (categoryName) => {
  //     setCate(categoryName); // Update selected category
  //     fetchEvent(categoryName); // Fetch filtered data
  //   };

  //   console.log(cate);

  console.log("plants", plants);
  //   console.log(category);
  return (
    <div className="mx-5">
      <div className="relative w-full border rounded shadow flex items-center gap-4 p-3 md:p-6 overflow-x-auto">
        {categories.map((cat) => (
          <div key={cat.id} className="text-xs md:text-xl">
            <button
              className="btn bg-green-200"
              onClick={() => fetchEvent(cat.id)}
            >
              {cat.name}
            </button>
          </div>
        ))}
      </div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {plants?.map((plant) => (
          <div
            key={plant.id}
            className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            bis_skin_checked="1"
          >
            <img
              src={plant?.image}
              alt=""
              className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
            />
            <div
              className="flex flex-col justify-between p-6 space-y-8"
              bis_skin_checked="1"
            >
              <div className="space-y-2" bis_skin_checked="1">
                <h3 className="text-3xl font-semibold tracking-wide">
                  {plant?.name}
                </h3>
                <h2 className="text-2xl text-green-400 font-bold my-4">
                  {plant?.price}৳
                </h2>
                <p className="dark:text-gray-800">
                  {plant?.category || "No Category"}
                </p>
              </div>
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-green-500 dark:text-gray-50"
              >
                <Link to={`details/${plant.id}`}>Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plants;
