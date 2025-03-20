const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("./services/google");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const requestLogger = require("./middlewares/logRequests");
const connectDB = require("./services/mongodb");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// data controllers
connectDB();

// Routes
const gistRoutes = require("./routes/gistRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const authRoutes = require("./routes/authRoutes");
const widgetRoutes = require("./routes/widgetRoutes");
const googleRoutes = require("./routes/googleAuth");
const chatRoutes = require("./services/socket");

// Use the middleware
app.use(requestLogger);
// Middleware
app.use(express.json());
app.use(cookieParser());
// Session for Passport
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/api/google", googleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

// Wildcard route to serve index.html for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
