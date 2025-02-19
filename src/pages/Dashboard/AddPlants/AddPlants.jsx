import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const AddPlants = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eco-greens.vercel.app/categories/list/", {
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
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", "eco_greens_img");
    formData.append("cloud_name", "ddgzmfesc");
    const url = `https://api.cloudinary.com/v1_1/ddgzmfesc/image/upload`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.asset_id) {
          const product = {
            name: data.name,
            price: data.price,
            description: data.description,
            img: imgData.url,
            category: data.category,
            stock: data.stock,
          };
          fetch("https://eco-greens.vercel.app/plants/add/", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Token ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message) {
                toast.success(data.message);
                navigate("/dashboard/allPlants");
              }
            });
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Eco Greens | Add Plants</title>
      </Helmet>
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
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
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
                accept="image/*"
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
    </>
  );
};

export default AddPlants;
