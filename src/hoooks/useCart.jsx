// import { useState, useEffect } from "react";

// const useCart = () => {
//   const [cart, setCart] = useState([]);

//   // Load cart from localStorage when the component mounts
//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Function to add an item to the cart (without duplicates)
//   const addToCart = (plant) => {
//     // Check if the item is already in the cart
//     const isAlreadyInCart = cart.some((item) => item.id === plant.id);

//     if (!isAlreadyInCart) {
//       const updatedCart = [...cart, plant];
//       setCart(updatedCart);
//     }
//   };

//   // Function to remove an item from the cart
//   const removeFromCart = (plantId) => {
//     const updatedCart = cart.filter((item) => item.id !== plantId);
//     setCart(updatedCart);
//   };

//   return { cart, addToCart, removeFromCart };
// };

// export default useCart;

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useCart = () => {
  // Load cart from localStorage immediately on initialization
  const user = localStorage.getItem("username");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : []; // Ensure it's an array
    return Array.isArray(parsedCart)
      ? parsedCart.filter((item) => item.user == user)
      : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart (without duplicates)
  const addToCart = ({ plant, quantity }) => {
    const isAlreadyInCart = cart.some((item) => item.id === plant.id);
    const item = {
      id: plant.id,
      category: plant.category,
      category_name: plant.category_name,
      created_at: plant.created_at,
      description: plant.description,
      image: plant.image,
      mobile_no: plant.mobile_no,
      name: plant.name,
      price: plant.price,
      seller: plant.seller,
      seller_name: plant.seller_name,
      stock: plant.stock,
      quantity: quantity,
      user: user,
    };
    if (!isAlreadyInCart) {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      window.location.reload();
    }
    {
      toast.error("Already in cart");
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (plantId) => {
    const updatedCart = cart.filter((item) => item.id !== plantId);
    setCart(updatedCart);
  };

  return { cart, addToCart, removeFromCart };
};

export default useCart;
