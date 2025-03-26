import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // ✅ Corrected placement
        });

        const result = await response.json();
        console.log("Login Response:", result);

        if (result.data === "success") {
            navigate('/home'); // Redirect on success
        } else {
            alert(result?.data || "Unexpected error occurred"); // Show error message from backend
        }

    } catch (err) {
        console.error("Error:", err);
        alert("Failed to connect to the server. Please try again");
    }
};




  return (
    <div className="login-page">
      <div className="login-container bg-white p-5 rounded shadow-lg text-center" style={{ maxWidth: "430px", width: "100%" }}>
        <h2 className="mb-4">Log In</h2>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
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
          <div className="mb-3 form-check text-start">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            <a href="#" className="float-end text-decoration-none">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-dark w-100 py-2">PROCEED</button>
        </form>
        <p className="text-center mt-4 mb-2">OR USE</p>
        <button className="btn btn-outline-dark w-100 py-2" onClick={() => navigate("/register")}>SIGN UP</button>
      </div>
    </div>
  );
}

export default Login;
