import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = ({ closeLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setUser, setToken } =
    useContext(Context);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Logged In Successfully");
      setIsAuthenticated(true);
      setUser(data.user);
      setToken(data.token);
      window.localStorage.setItem("token", data.token);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login">
      <div className="logo-section">
        <h1>Food Menu</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`form-container ${loading && "loading"}`}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} type="submit" className="btn">
          {loading ? "processing..." : "Login"}
        </button>
        <h4>Or</h4>
        <button onClick={closeLogin} className="closeBtn">
          Close
        </button>
      </form>
    </div>
  );
};

export default Login;
