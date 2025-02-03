import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const storedUserId = localStorage.getItem("user_id");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return Array.isArray(parsedCart)
      ? parsedCart.filter((item) => item.user === storedUserId)
      : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = ({ plant, quantity }) => {
    const isAlreadyInCart = cart.some(
      (item) => item.id === plant.id && item.user === storedUserId
    );
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
      user: storedUserId,
    };

    if (!isAlreadyInCart) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart, item];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
      toast.success("Product added in cart successfully");
    } else {
      toast.error("Already in cart");
    }
  };

  const removeFromCart = (plantId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== plantId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Product removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
