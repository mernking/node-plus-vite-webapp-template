// src/pages/Signup.jsx
import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account created!");
        // maybe redirect to login
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Error signing up", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-xl p-8 rounded-lg w-full max-w-md border border-primary"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">Sign Up</h2>

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
          Sign Up
        </button>
      </form>
    </div>
  );
}
