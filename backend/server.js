const express = require("express");
const connectDB = require("./config/db"); // Import the DB connection function
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Debug log to verify that the MONGO_URI is being loaded correctly
console.log("Mongo URI:", process.env.MONGO_URI); // This will print the Mongo URI or undefined if there's an issue

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Allows us to parse JSON data in request bodies

// Routes go here (e.g., for notes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
