import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import { FormSvg } from "../assets/images";
import axios from "axios";
import FormLoader from "../utils/FormLoader";

const Register = () => {
  const { user, setUser } = useContext(UserContext);
  if (user) {
    return <Navigate to={"/account"} />;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data);
      setLoading(false);
      setRedirect(true);
      toast.success("Account Created Successfully!");
    } catch (error) {
      const errMsg = error.response.data.msg;
      console.log(error);
      toast.error(errMsg);
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/account"} />;
  }

  return (
    <section className="w-full md:flex md:items-center md:justify-between">
      {loading && <FormLoader />}
      <div className="md:w-1/2 md:h-screen relative p-10 bg-light-blue text-white">
        <h2 className="text-xl font-bold mb-2">Please Sign up to continue!</h2>
        <p className="">
          Welcome to our platform! Register to explore the possibilities, Manage
          your food menu online, join us.
        </p>
        <div className="w-full h-96 md:mt-6">
          <FormSvg className="w-full md:mt-10" />
        </div>
      </div>
      <div className="md:w-1/2">
        <form className="p-10 md:p-20" onSubmit={handleSumbit}>
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="mb-6">
            Ensure your online security by utilizing strong and unique passwords
          </p>
          <div className="group relative">
            <label className="absolute top-[-17px] left-2 bg-white text-black px-2 py-1 group-focus-within:text-light-blue">
              Restaurant's name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              required
              placeholder="The Bombay Canteen"
              className="py-3 px-4 mb-5 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setName(e.target.value)}
              minLength={3}
            />
          </div>
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
              required
              placeholder="password"
              className="py-3 px-4 mb-4 border border-gray-300 rounded-md text-base w-full focus:border-light-blue focus:outline-none focus:shadow-none focus:placeholder:text-light-blue focus:label:text-light-blue"
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <div className="mb-6">
            <span className="text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-light-blue underline">
                Login
              </Link>
            </span>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="login-btn w-full bg-light-blue border-none text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
              disabled={loading}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
