import { useParams } from "react-router-dom";
import img from "../../../assets/banner/nursery1.jpg";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Spinner from "../../../components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";

const Details = () => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false); // Stop loading if token is missing
      setError("Unauthorized: Token is missing.");
      return;
    }

    fetch(`https://eco-greens.onrender.com/plants/details/${id}/`, {
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
      <div className="flex flex-col md:flex-row  gap-5  my-10 md:mx-10 mx-2">
        <img src={data?.data.img} alt="plant details image" />
        <div className="">
          <h3 className="text-3xl text-black font-bold">{data.data.name}</h3>
          <h2 className="text-2xl text-black font-bold my-4">
            {data.data.price} ৳
          </h2>
          <p className="text-slate-600">
            {getDescriptionPreview(data.data.description)}
          </p>
          <p className="text-slate-600">
            <span className="font-bold">Category: </span>
            {data.data.category_name}
          </p>
          <p className="text-slate-600">
            <span className="font-bold">Stock: </span>
            {data.data.stock > 0 ? data.data.stock : "Out of stock"}
          </p>
          <p className="text-slate-600">All Bangladesh Delivery</p>
          <p className="text-slate-600">Item will be shipped by 1-5 days</p>
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
      </div>
    </>
  );
};

export default Details;
