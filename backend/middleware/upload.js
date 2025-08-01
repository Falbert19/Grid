const multer = require('multer');

const storage = multer.memoryStorage(); // Cloudinary handles the buffer
const upload = multer({ storage });

module.exports = upload;
