const { Afati } = require('../config/associations'); // use your exported models

// Get all Afati entries
exports.getAllAfati = async (req, res) => {
  try {
    const allAfati = await Afati.findAll({ order: [['createdAt', 'DESC']] });
    res.json(allAfati);
  } catch (error) {
    console.error("Error fetching afati:", error);
    res.status(500).json({ message: "Failed to fetch afati." });
  }
};

// Get one Afati by ID
exports.getAfatiById = async (req, res) => {
  try {
    const afati = await Afati.findByPk(req.params.id);
    if (!afati) return res.status(404).json({ message: "Afati not found" });

    res.json(afati);
  } catch (error) {
    console.error("Error fetching afati by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new Afati
exports.createAfati = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newAfati = await Afati.create({ name });
    res.status(201).json(newAfati);
  } catch (error) {
    console.error("Error creating afati:", error);
    res.status(500).json({ message: "Failed to create afati" });
  }
};

// Update existing Afati
exports.updateAfati = async (req, res) => {
  try {
    const { name } = req.body;
    const afati = await Afati.findByPk(req.params.id);

    if (!afati) return res.status(404).json({ message: "Afati not found" });

    afati.name = name || afati.name;
    await afati.save();

    res.json(afati);
  } catch (error) {
    console.error("Error updating afati:", error);
    res.status(500).json({ message: "Failed to update afati" });
  }
};

// Delete Afati
exports.deleteAfati = async (req, res) => {
  try {
    const afati = await Afati.findByPk(req.params.id);
    if (!afati) return res.status(404).json({ message: "Afati not found" });

    await afati.destroy();
    res.json({ message: "Afati deleted successfully" });
  } catch (error) {
    console.error("Error deleting afati:", error);
    res.status(500).json({ message: "Failed to delete afati" });
  }
};
