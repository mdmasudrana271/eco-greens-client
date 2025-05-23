import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProviders";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex md:flex-row flex-col">
        {/* dashboard side bar */}
        <div className=" w-full md:w-64 md:min-h-screen bg-green-200 text-white">
          <ul className="menu p-4 text-black">
            <>
              {user.account_type == "Seller" ? (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addPlants">Add Plants</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addCategory">Add Category</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/allPlants">All Plants</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/orders">My Orders</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/dashboard/orders">My Orders</Link>
                </li>
              )}
            </>
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 md:p-8 mt-10 md:mt-0">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
