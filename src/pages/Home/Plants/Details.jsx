import { useLoaderData } from "react-router-dom";
import img from "../../../assets/banner/nursery1.jpg";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

const Details = () => {
  const data = useLoaderData();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Update state
  };

  const remQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Update state
    }
  };
  console.log(data);
  return (
    <div className="flex flex-col md:flex-row  gap-5  my-10 md:mx-10 mx-2">
      <img src={img} alt="plant details image w-3/5" />
      <div className="">
        <h3 className="text-3xl text-black font-bold">{data.data.name}</h3>
        <h2 className="text-2xl text-green-400 font-bold my-4">
          {data.data.price}৳
        </h2>
        <p className="text-slate-600">{data.data.description}</p>
        <p className="text-slate-600">
          <span className="font-bold">Category: </span>
          {data.data.category}
        </p>
        <p className="text-slate-600">
          <span className="font-bold">Stock: </span>
          {data.data.stock > 0 ? data.data.stock : "Out of stock"}
        </p>
        <div className="flex justify-start items-center mt-3">
          <button onClick={remQuantity} className="btn border rounded-none">
            -
          </button>
          <p className="btn border rounded-none">{quantity}</p>

          <button onClick={addQuantity} className="btn border rounded-none">
            +
          </button>
        </div>
        <button
          onClick={() => addToCart({ plant: data.data, quantity })}
          className="btn text-white bg-green-400 rounded-none"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Details;
