import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
    }
  };

  const handleLogin = (data) => {
    const username = data.username;
    const password = data.password;
    fetch("http://127.0.0.1:8000/account/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("username", data.username);
          setUser(data.user);
          toast.success("Login successful");
          reset();
          // navigate("/dashboard/update_profile");
        } else {
          toast.error(data.error || "Login failed");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="card overflow-hidden p-5  md:w-6/12 mx-auto w-full shadow-xl bg-base-100 md:my-5">
        <div>
          <h1 className="text-4xl text-center font-bold">Login</h1>
          <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Enter Your Username"
                className="input input-bordered w-full"
              />
              {errors.username && (
                <p role="alert" className="text-error">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must have uppercase, number and special characters",
                  },
                })}
                type={passwordType}
                placeholder="******"
                className="input input-bordered w-full"
              />
              {passwordType === "password" ? (
                <p onClick={handlePasswordType} className=" cursor-pointer">
                  show password
                </p>
              ) : (
                <p onClick={handlePasswordType} className=" cursor-pointer">
                  hide password
                </p>
              )}
              <label className="label mt-1"></label>
              {errors.password && (
                <p className="text-error">{errors.password?.message}</p>
              )}
            </div>
            <input
              className="btn btn-outline btn-accent w-full mt-5 text-xl font-bold"
              value="Login"
              type="submit"
            />
            <p className="mt-3 text-center">
              New to this site ?{" "}
              <Link className="text-blue-700" to="/signup">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
