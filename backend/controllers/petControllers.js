const Pet = require('../models/petModels');
let io;

module.exports.setSocket = (socket) => {
  io = socket;
};

module.exports.getAllPets = async (req, res) => {
  try {
    const allPets = await Pet.find();
    res.json({ pets: allPets });
  } catch (err) {
    console.error('Error fetching all pets:', err);
    res.status(500).json({ message: 'Error fetching all pets', error: err.message });
  }
};

module.exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params._id);
    res.json({ pet });
  } catch (err) {
    console.error('Error fetching this pet:', err);
    res.status(500).json({ message: 'Error fetching this pet', error: err.message });
  }
};

module.exports.createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    res.json({ pet: newPet });
  } catch (err) {
    console.error('Error creating pet:', err);
    if (err.code === 11000) { // Código de error para duplicado en MongoDB
      res.status(400).json({ message: 'Pet name already exists.' });
    } else if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.errors });
    } else {
      res.status(500).json({ message: 'Error creating pet', error: err.message });
    }
  }
};

module.exports.updatePet = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name } = req.body;
    const existingPet = await Pet.findOne({ name, _id: { $ne: _id } });

    if (existingPet) {
      return res.status(400).json({ message: 'Pet name already exists.' });
    }

    const updatedPet = await Pet.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    res.json({ pet: updatedPet });
  } catch (err) {
    console.error('Error updating pet:', err);
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.errors });
    } else {
      res.status(500).json({ message: 'Error updating pet', error: err.message });
    }
  }
};

module.exports.deletePet = async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params._id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    console.error('Error deleting pet:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error deleting pet', error: err.message });
    }
  }
};
