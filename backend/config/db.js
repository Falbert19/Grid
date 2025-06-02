// db.js ()
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit failure process
    }
};

module.exports = connectDB; // Export the connectDB function