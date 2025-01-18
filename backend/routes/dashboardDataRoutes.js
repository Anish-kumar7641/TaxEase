const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {getDetails} = require('../controllers/dashboardData');

router.get('/dashboard-data', auth, getDetails);

module.exports = router;