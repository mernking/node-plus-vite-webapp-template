const express = require("express");
const multer = require("multer");
const { uploadMedia, deleteMedia } = require("../services/cloudinary");
const User = require("../models/user");

const router = express.Router();
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Upload media and save URL in User
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const uploadResult = await uploadMedia(req.file.buffer);

    // Save media URL to user
    user.media.push(uploadResult.secure_url);
    await user.save();

    res.json({
      message: "Media uploaded",
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete media and remove from User
router.delete("/delete/:userId/:publicId", async (req, res) => {
  try {
    const { userId, publicId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await deleteMedia(publicId);

    // Remove media URL from user's media list
    user.media = user.media.filter((url) => !url.includes(publicId));
    await user.save();

    res.json({ message: "Media deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all media for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ media: user.media });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
