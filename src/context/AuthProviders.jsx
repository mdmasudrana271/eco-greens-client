import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  // const [user, setUser] = useState();
  const logOut = () => {
    const token = localStorage.getItem("authToken");
    fetch("http://127.0.0.1:8000/account/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("donor_id");
        toast.success("Login successful");
        setUser(null);
        window.location.reload();
      });
  };

  const authInfo = {
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProviders;
