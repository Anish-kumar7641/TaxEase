const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { addEntry, getEntries, deleteEntry } = require('../controllers/financeController');

// Routes for finance
router.post('/add',auth, addEntry);
router.post('/all',auth, getEntries);
router.delete('/delete/:id',auth, deleteEntry);

module.exports = router;
