import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  // const [user, setUser] = useState();
  const [userid, setUserid] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
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
        toast.success("Logout successful");
        // window.location.reload();
        setUser(null);
        setUserid(null);
        setToken(null);
        setRole(null);
        setIsAuth(false);
        localStorage.removeItem("user_id");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      });
  };
  const loginUser = (username, password) => {
    fetch("http://127.0.0.1:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setUserid(data.user_id);
          setToken(data.token);
          setRole(data.account_type);
          setIsAuth(true);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("username", data.username);
          toast.success("Login successful");
          getAuthUser().then((userData) => {
            setUser(userData.data);
          });
        } else {
          toast.error(data.error || "Login failed");
        }
      })
      .catch((error) => {
        toast.error(error.message || "Login failed");
      });
  };

  const getAuthUser = async () => {
    const UserId = localStorage.getItem("user_id");
    const Token = localStorage.getItem("authToken");

    if (UserId && Token) {
      fetch(`http://127.0.0.1:8000/account/details/${UserId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${Token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.data);
          setUserid(UserId);
          setToken(Token);
          localStorage.setItem("user", JSON.stringify(data.data));
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUser(null);
      setUserid(null);
      setToken(null);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuth(true);
      setUser(user);
      setRole(user.account_type);
    }
    setLoading(false);
  }, []);

  const authInfo = {
    logOut,
    loginUser,
    user,
    isAuth,
    loading,
    role,
    token,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProviders;
