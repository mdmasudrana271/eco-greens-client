import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Spinner from "../../../components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Details = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const [data, setData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBlogs, setExpandedBlogs] = useState({});

  const toggleExpand = (blogId) => {
    setExpandedBlogs((prevState) => ({
      ...prevState,
      [blogId]: !prevState[blogId], // Toggle only the clicked blog
    }));
  };

  useEffect(() => {
    if (!token) {
      setLoading(false); // Stop loading if token is missing
      setError("Unauthorized: Token is missing.");
      return;
    }

    fetch(`https://eco-greens.vercel.app/plants/details/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, token]);

  useEffect(() => {
    fetch(`https://eco-greens.vercel.app/plants/blogs/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((blogdata) => {
        setBlogs(blogdata.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("blogs data:", blogs);

  const handleAddBlog = (bloogdata) => {
    const formData = new FormData();
    formData.append("file", bloogdata.image[0]);
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
          const blog = {
            title: bloogdata.title,
            content: bloogdata.content,
            description: data.description,
            img: imgData.url,
            plant: data.data.id,
          };
          fetch("https://eco-greens.vercel.app/plants/blogs/", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(blog),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message) {
                toast.success(data.message);
                reset();
              }
            });
        }
      });
  };

  if (loading) return <Spinner></Spinner>;
  if (error) return <p>Error: {error}</p>;

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Update state
  };

  const remQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Update state
    }
  };

  const getDescriptionPreview = (description) => {
    const words = description.split(" "); // Split the description by spaces into words
    return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : ""); // Join the first 15 words and add "..." if there are more
  };
  console.log(data);
  return (
    <>
      <Helmet>
        <title>Eco Greens | Plant Details</title>
      </Helmet>
      <section className="flex flex-col md:flex-row  gap-5  my-10 md:mx-10 mx-2">
        <img
          src={data?.data.img}
          alt="plant details image"
          className="md:w-1/2 md:h-[80vh] rounded"
        />
        <div className="">
          <h3 className="text-3xl text-black font-extrabold">
            {data?.data.name}
          </h3>
          <h2 className="text-2xl text-black font-medium my-4">
            {data?.data.price} ৳
          </h2>
          <p className="text-slate-600">
            {getDescriptionPreview(data.data.description)}
          </p>
          <p className="text-slate-600">
            <span className="font-bold">Category: </span>
            {data?.data.category_name}
          </p>
          <p className="text-slate-600">
            <span className="font-bold">Stock: </span>
            {data?.data.stock > 0 ? data?.data.stock : "Out of stock"}
          </p>
          <p className="text-slate-600 font-semibold">
            All Bangladesh Delivery
          </p>
          <p className="text-slate-600 font-semibold">
            Item will be shipped by 1-5 days
          </p>
          <p className="text-error font-bold">
            The image is for reference purpose only.
          </p>
          <div className="flex justify-start items-center mt-3">
            <button onClick={remQuantity} className="btn border rounded-none">
              -
            </button>
            <p className="btn border rounded-none">{quantity}</p>

            <button onClick={addQuantity} className="btn border rounded-none">
              +
            </button>
            <button
              onClick={() => addToCart({ plant: data.data, quantity })}
              className="btn text-white bg-green-400 ml-2 rounded-none"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </section>
      <section className="mt-32 mb-10 md:mx-10 mx-2">
        <h3 className="text-2xl md:text-5xl font-extrabold">
          Gardening Tips For this Plants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10">
          {blogs.map((blog) => (
            <div
              className="flex flex-col  p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800"
              bis_skin_checked="1"
            >
              <div className="flex space-x-4" bis_skin_checked="1">
                <div className="flex flex-col space-y-1" bis_skin_checked="1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-sm font-semibold"
                  >
                    {blog.author_name}
                  </a>
                  <span className="text-xs dark:text-gray-600">
                    {new Date(blog.created_at).toLocaleString("en-US", {
                      weekday: "long", // "Monday"
                      year: "numeric", // "2025"
                      month: "long", // "January"
                      day: "numeric", // "27"
                      hour: "numeric", // "5"
                      minute: "numeric", // "11"
                      second: "numeric", // "7"
                      hour12: true, // "AM/PM"
                    })}
                  </span>
                </div>
              </div>
              <div bis_skin_checked="1">
                <img
                  src={blog.img}
                  alt=""
                  className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                />
                <h2 className="mb-1 text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm dark:text-gray-600">
                  {expandedBlogs[blog.id]
                    ? blog.content
                    : blog.content.split(" ").slice(0, 20).join(" ") + "..."}
                </p>
                <button
                  onClick={() => toggleExpand(blog.id)}
                  className="text-blue-600 font-semibold mt-2"
                >
                  {expandedBlogs[blog.id] ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <h1 className="text-3xl font-bold">Write A Blog</h1>
          <form className="mt-6" onSubmit={handleSubmit(handleAddBlog)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title", { required: "Blog title is required" })}
                type="text"
                placeholder="Blog title"
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p role="alert" className="text-error">
                  {errors.title?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                {...register("content", {
                  required: "Content is required",
                })}
                type="text"
                placeholder="Content"
                className="textarea textarea-bordered w-full h-40"
              />
              {errors.content && (
                <p role="alert" className="text-error">
                  {errors.content?.message}
                </p>
              )}
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
            <input
              className="btn bg-green-400 text-white w-full mt-5"
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Details;
