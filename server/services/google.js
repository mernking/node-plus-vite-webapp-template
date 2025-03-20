const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Import User model
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/google/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // If user doesn't exist, create a new one
        if (!user) {
            const randomPassword = crypto.randomBytes(16).toString("hex");

            user = new User({
            googleId: profile.id,
            password: randomPassword,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            });
          await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        // Attach token to user object
        user.token = token;

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize & Deserialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
