import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddCategory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const Token = localStorage.getItem("authToken");

  const handleAddProduct = (data) => {
    const categoryData = { name: data.category };
    fetch("http://127.0.0.1:8000/categories/create/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${Token}`,
      },
      body: JSON.stringify(categoryData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Add Category Successfully");
        reset();
        //   navigate("/dashboard/my-products");
      });
  };

  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold">Add A Product</h1>
        <form className="mt-6" onSubmit={handleSubmit(handleAddProduct)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              {...register("category", {
                required: "Category name is required",
              })}
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
            />
            {errors.product && (
              <p role="alert" className="text-error">
                {errors.product?.message}
              </p>
            )}
          </div>

          <input
            className="btn btn-success w-full mt-5"
            value="Add Product"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
