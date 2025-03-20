const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // Use a secure secret key

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

// Signup (Register)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "User registered successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Login successful", userId: user._id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if User Exists (By Email)
router.get("/exists/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    user.password = newPassword; // This will trigger `pre("save")` to hash it
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout (Clears Cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Check Session (Auth Middleware)
router.get("/session", protect, async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ isAuthenticated: false });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ isAuthenticated: false });

    res.json({ isAuthenticated: true, user });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
});

module.exports = router;
