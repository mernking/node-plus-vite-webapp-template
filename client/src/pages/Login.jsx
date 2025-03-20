// src/pages/Login.jsx
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
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
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl p-8 rounded-lg w-full max-w-md border border-primary"
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
    </div>
  );
}
