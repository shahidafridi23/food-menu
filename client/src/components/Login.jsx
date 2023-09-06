import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import { FormSvg } from "../assets/images";
import axios from "axios";
const Login = () => {
  const { user, setUser } = useContext(UserContext);
  if (user) {
    return <Navigate to={"/account"} />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/login", { email, password });
      setUser(data);
      toast.success("Logged In Successfully!");
      setLoading(false);
      setRedirect(true);
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data.msg;
      toast.error(errMsg);
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <section
      className={`${
        loading && "opacity-80"
      } w-full md:flex md:flex-row-reverse  md:items-center md:justify-between`}
    >
      <div className="md:w-1/2 md:h-screen relative p-10 bg-light-blue text-white">
        <h2 className="text-xl font-bold mb-2">Please Sign in to continue!</h2>
        <p className="">
          Welcome Back to our platform! Log In to explore the possibilities,
          Manage your food menu online.
        </p>
        <div className="">
          <FormSvg className="w-full md:mt-10" />
        </div>
      </div>
      <div className="md:w-1/2">
        <form className="p-10 md:p-20" onSubmit={handleSumbit}>
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="mb-6">
            Attract more customers and enhance your dining experience.
          </p>
          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={email}
              required
              placeholder="example@gmail.com"
              className="py-3 px-4 mb-5 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              required
              className="py-3 px-4 mb-4 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <span className="text-gray-600">
              Dont have an account?{" "}
              <Link to={"/register"} className="text-light-blue underline">
                Register
              </Link>
            </span>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="login-btn w-full bg-light-blue border-none text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
