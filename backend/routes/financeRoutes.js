const express = require('express');
const router = express.Router();
const { addEntry, getEntries, deleteEntry } = require('../controllers/financeController');

// Routes for finance
router.post('/add', addEntry);
router.get('/all', getEntries);
router.delete('/delete/:id',deleteEntry);

module.exports = router;
