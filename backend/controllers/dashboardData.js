const User = require('../models/User');
const Finance = require('../models/financeModel');
const UserTaxData = require('../models/userTaxData');
const mongoose = require('mongoose');

exports.getDetails = async (req, res) => {
    try {

        const userData = await User.findById(req.user.id)
            .select('-password');

        // Get finance data
        const financeData = await Finance.find({ userId: req.user.id })
            .sort({ date: -1 })
            .limit(50); // Limit to recent 50 transactions for performance

        // Get tax data for current assessment year
        const currentYear = new Date().getFullYear();
        const assessmentYear = new Date().getMonth() >= 3
            ? currentYear + 1  // If after March, use the next year (e.g., 2025)
            : currentYear;

        const userid = new mongoose.Types.ObjectId(req.user.id);
        const taxData = await UserTaxData.findOne({
            userId: userid,
            assessmentYear: String(assessmentYear),
        }).sort({ date: -1 }).limit(1);
        res.json({
            success: true,
            data: {
                userData,
                financeData,
                taxData
            }
        });

    } catch (error) {
        console.error('Dashboard data fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching dashboard data'
        });
    }
};

