import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = ({ closeSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setToken, setUser } =
    useContext(Context);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/auth/register`,
        {
          name,
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

      toast.success("Registered Successfully");
      setIsAuthenticated(true);
      setUser(data.user);
      setToken(data.token);
      window.localStorage.setItem("token", data.token);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="login">
        <div className="logo-section">
          <h1>Food Menu</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`form-container ${loading && "loading"}`}
        >
          <input
            type="text"
            placeholder="Restaurant's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            {loading ? "processing..." : "Sign Up"}
          </button>
          <h4>Or</h4>
          <button onClick={closeSignUp} className="closeBtn">
            Close
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
