const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads media directly from buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer.
 * @returns {Promise<Object>} - Upload response.
 */
async function uploadMedia(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "kingswidget" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}

/**
 * Deletes a media file from Cloudinary using its public ID.
 * @param {string} publicId - Public ID of the file in Cloudinary.
 * @returns {Promise<Object>} - Deletion response.
 */
async function deleteMedia(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting media:", error.message);
    throw error;
  }
}

module.exports = { uploadMedia, deleteMedia };
