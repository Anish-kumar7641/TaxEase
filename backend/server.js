const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require('./config/db')
const financeRoutes = require('./routes/financeRoutes');
const userAuthentication = require("./routes/userRoutes")
const calculateTaxRoutes = require("./routes/calculateTaxRoutes");
const optimizationRoutes = require("./routes/optimizationRoutes");
const taxRoutes = require("./routes/taxRoutes");
const dashboardDataRoute=require("./routes/dashboardDataRoutes");


dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/users", userAuthentication);
app.use('/api/finance', financeRoutes);
app.use("/api/calculatetax", calculateTaxRoutes);
app.use("/api/optimization", optimizationRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/dashboard", dashboardDataRoute);



// Port Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
