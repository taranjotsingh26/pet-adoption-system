const Pet = require("../models/Pet");

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pets",
      error: error.message
    });
  }
};

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found"
      });
    }

    res.status(200).json({
      success: true,
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pet",
      error: error.message
    });
  }
};

const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pet created successfully",
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create pet",
      error: error.message
    });
  }
};

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet updated successfully",
      data: pet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update pet",
      error: error.message
    });
  }
};

const adoptPet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { adoptionStatus: "Adopted" },
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet adopted successfully",
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to adopt pet",
      error: error.message
    });
  }
};

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete pet",
      error: error.message
    });
  }
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  adoptPet,
  deletePet
};