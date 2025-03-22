// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
        localStorage.setItem("token", data.token);
        alert("Logged in!");
        // redirect or update UI
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Error logging in", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-background text-text">
      <form
        onSubmit={handleLogin}
        className="shadow-xl p-8 rounded-lg w-full max-w-md border border-primary"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded hover:bg-accent transition"
        >
          Login
        </button>
      </form>
      <div className="w-full text-center py-3">
        <Link to={"/signup"}>
          <button>
            <p>
              already have an account?{" "}
              <span className="text-accent font-bold">signup</span>
            </p>
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to={"http://localhost:5000/api/google/login"}>
          <button className="py-2 px-4 bg-accent">
            <p>login with google</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
