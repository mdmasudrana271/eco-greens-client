import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Main from "../Layout/Main";
import Details from "../pages/Home/Plants/Details";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/shared/ErrorPage/ErrorPage";
import SellerRoute from "./SellerRoute";
import AddPlants from "../pages/Dashboard/AddPlants/AddPlants";
import DashBoardLayout from "../Layout/DashBoardLayout";
import AddCategory from "../pages/Dashboard/AddCategory/AddCategory";
import AllPlants from "../pages/Dashboard/AllPlants/AllPlants";
import Cart from "../pages/Dashboard/Cart/Cart";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import Payment from "../pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`https://eco-greens.onrender.com/plants/details/${params.id}/`),
        loader: async ({ params }) => {
          const token = localStorage.getItem("authToken"); // Get the token from localStorage
          const response = await fetch(
            `https://eco-greens.onrender.com/plants/details/${params.id}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`, // Send the token in the request
              },
            }
          );

          if (!response.ok) {
            throw new Response("Not Found", { status: response.status });
          }

          return response.json(); // Convert response to JSON
        },
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      { path: "contact", element: <div>Contact us</div> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      // normal user routes

      {
        path: "addPlants",
        element: (
          <SellerRoute>
            <AddPlants></AddPlants>
          </SellerRoute>
        ),
      },
      {
        path: "addCategory",
        element: (
          <SellerRoute>
            <AddCategory></AddCategory>
          </SellerRoute>
        ),
      },
      {
        path: "allPlants",
        element: (
          <SellerRoute>
            <AllPlants></AllPlants>
          </SellerRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const token = localStorage.getItem("authToken"); // Get the token from localStorage
          const response = await fetch(
            `https://eco-greens.onrender.com/orders/list/${params.id}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`, // Send the token in the request
              },
            }
          );

          if (!response.ok) {
            throw new Response("Not Found", { status: response.status });
          }

          return response.json(); // Convert response to JSON
        },
      },
    ],
  },
]);
