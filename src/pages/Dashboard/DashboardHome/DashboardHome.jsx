import SellerDashboardHome from "../SellerDashboardHome/SellerDashboardHome";
import UserDashboardHome from "../UserDashboardHome/UserDashboardHome";

const DashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user: ", user);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {user.account_type == "Seller" ? (
        <>
          <SellerDashboardHome></SellerDashboardHome>
        </>
      ) : (
        <>
          <UserDashboardHome></UserDashboardHome>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
