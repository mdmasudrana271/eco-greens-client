import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthProviders";
import { CartContext } from "../../../context/CartContext";
const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logOut } = useContext(AuthContext);
  // console.log("user:", user);
  return (
    <>
      <div className="navbar bg-green-50 sticky top-0 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/cart">
                  <button className="btn">
                    <FaShoppingCart className="mr-2"></FaShoppingCart>
                    <div className="badge badge-success">+{cart.length}</div>
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">All Plants</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {user != null ? (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li onClick={logOut}>Logout</li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Eco Greens
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/cart">
                <p className="flex justify-center items-center">
                  <FaShoppingCart className="mr-2"></FaShoppingCart>
                  <div className="badge badge-success">+{cart.length}</div>
                </p>
              </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">All Plants</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {user != null ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li onClick={logOut}>
                  <Link>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
