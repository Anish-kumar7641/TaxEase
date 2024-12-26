const Finance = require('../models/financeModel');

// Add new financial entry
exports.addEntry = async (req, res) => {
  try {
    const entry = new Finance(req.body);
    await entry.save();
    console.log("entry added");
    res.status(201).json({ message: 'Entry added successfully', entry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all financial entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await Finance.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete financial entry
exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedEntry = await Finance.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' }); 
    }

    res.status(200).json({ message: 'Entry deleted successfully', deletedEntry });
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};
