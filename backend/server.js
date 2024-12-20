const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require('./config/db')

dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Port Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
