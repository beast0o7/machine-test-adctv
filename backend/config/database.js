const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

(async () => {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected")
})();
