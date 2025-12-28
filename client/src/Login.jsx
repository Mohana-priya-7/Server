import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    axios.post("https://server-1cdd.onrender.com/login",{email, password })
      .then((res) => {
        console.log("Login Response:", res.data);
        if (res.data.message === "Login successful") {
          alert(`Welcome ${res.data.user.name}! Redirecting to quiz...`);
          // Redirect to the MongoDB-connected quiz application
          window.location.href = "https://mohana-priya-7.github.io/QUIZ/";
        } else {
          alert(res.data.message || "Invalid credentials. Try again.");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        const errorMessage = err.response?.data?.message || "Error during login. Please try again.";
        alert(errorMessage);
      });
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <div className="auth-title">Login</div>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;