import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    axios.post("https://server-1cdd.onrender.com/register", { name, email, password })
      .then((res) => {
        console.log("Registration Response:", res.data);
        if (res.data.message === "Registration successful") {
          alert("Registered Successfully! Redirecting to Login...");
          navigate("/login");
        } else {
          alert(res.data.message || "Registration failed. Try again.");
        }
      })
      .catch((err) => {
        console.error("Registration Error:", err);
        const errorMessage = err.response?.data?.message || "Error during registration. Please try again.";
        alert(errorMessage);
      });
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-title">Register</div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="auth-input"
              autoComplete="off"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="auth-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="auth-input"
              autoComplete="off"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="auth-input"
              autoComplete="off"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
        <p style={{ textAlign: "center", color: "#000", fontWeight: 500 }}>
          Already have an account?
        </p>
        <Link to="/login" className="auth-link-btn">
          Login
        </Link>
      </div>
    </div>
  );
}
export default Signup; 