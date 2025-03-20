const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// ✅ Google OAuth Login
router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Google OAuth Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign({ userId: req.user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect("/dashboard"); // Redirect to client dashboard
  }
);

// ✅ Get Authenticated User
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });

  res.json({ user: req.user });
});

// ✅ Logout User
router.get("/logout", (req, res) => {
  res.clearCookie("token"); // Remove token cookie
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
