import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        navigate("/home"); // Navigate to the home page after successful registration
      } else {
        alert(result.error || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
  return (
    <div className="signup-page">
      <div className="signup-container bg-white p-4 rounded shadow">
        <h2 className="text-center">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="johncena@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label className="form-check-label" htmlFor="terms">
              I agree to the Terms of Service and Privacy Policy.
            </label>
          </div>
          <button type="submit" className="btn btn-dark w-100">Register</button>
        </form>
        <p className="text-center mt-3">OR</p>
        <button className="btn btn-outline-dark w-100" onClick={() => navigate("/login")}>SIGN IN</button>
      </div>
    </div>
  );
}

export default Signup;
