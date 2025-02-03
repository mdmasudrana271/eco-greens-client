import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProviders";
import { useNavigate } from "react-router-dom";

const AddPlants = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { time, user, isLoading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const imageHostKey = import.meta.env.VITE_IMGBB_API_KEY;

  // console.log("hostkey: ", imageHostKey);

  useEffect(() => {
    fetch("https://eco-greens.onrender.com/categories/list/", {
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

  const handleAddProduct = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    for (let entry of formData.entries()) {
      console.log(entry[0], entry[1]); // This will log the form field name and the value (image file)
    }
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log("ImgBB Response:", imgData);
        if (imgData.success) {
          const product = {
            name: data.name,
            price: data.price,
            description: data.description,
            img: imgData.data.url,
            category: data.category,
            stock: data.stock,
          };

          fetch("https://eco-greens.onrender.com/plants/add/", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Token ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Add Product Successfully");
                navigate("/dashboard/my-products");
              }
            });
          console.log(product);
        }
      });
  };
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold">Add A Product</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleAddProduct)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Plant Name</span>
            </label>
            <input
              {...register("name", { required: "Product name is required" })}
              type="text"
              placeholder="Plant Name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p role="alert" className="text-error">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              placeholder="Description"
              className="input input-bordered w-full"
            />
            {errors.description && (
              <p role="alert" className="text-error">
                {errors.description?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", {
                required: "Description is required",
              })}
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p role="alert" className="text-error">
                {errors.price?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))}
              {/* <option>Science & Technology</option>
              <option>Fiction & Literature</option>
              <option>Lifestyle</option> */}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              {...register("image", { required: "image is required" })}
              type="file"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <p role="alert" className="text-error">
                {errors.image?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              {...register("stock", { required: "Stock is required" })}
              type="number"
              className="input input-bordered w-full"
            />
            {errors.stock && (
              <p role="alert" className="text-error">
                {errors.stock?.message}
              </p>
            )}
          </div>
          <input
            className="btn bg-green-400 text-white w-full mt-5"
            value="Add Product"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddPlants;
