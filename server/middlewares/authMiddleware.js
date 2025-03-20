const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ error: "Not authorized, no token" });

    // Verify token and extract user ID
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch full user details (excluding password)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    // Attach full user details to request
    req.user = user;

    res.locals.user = user; // Optional: Make user available in templates if needed

    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, invalid token" });
  }
};

module.exports = protect;
