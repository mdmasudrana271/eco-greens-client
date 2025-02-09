import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProviders";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex md:flex-row flex-col">
        {/* dashboard side bar */}
        <div className="w-full md:w-64 md:min-h-screen bg-green-200 text-white">
          <ul className="menu p-4 text-black">
            <>
              {/* <li>
                <NavLink to="/dashboard/update_profile">Update Profile</NavLink>
              </li> */}
              {user.account_type == "Seller" ? (
                <>
                  <li>
                    <NavLink to="/dashboard/addPlants">Add Plants</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addCategory">Add Category</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/allPlants">All Plants</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/orders">My Orders</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/dashboard/orders">My Orders</NavLink>
                </li>
              )}
            </>
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">Home</NavLink>
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
