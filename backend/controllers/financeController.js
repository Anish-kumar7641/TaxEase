const Finance = require('../models/financeModel');

exports.addEntry = async ( req, res) => {
  try {
    const entry = new Finance({
      ...req.body,
      userId: req.body.userid 
    });
    await entry.save();
    res.status(201).json({ message: 'Entry added successfully', entry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const {userid}=req.body;
    const entries = await Finance.find({ userId: userid });
    res.status(200).json(entries);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const deletedEntry = await Finance.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'Entry deleted successfully', deletedEntry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
