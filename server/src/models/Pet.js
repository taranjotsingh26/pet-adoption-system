const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    species: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"]
    },
    breed: {
      type: String,
      default: ""
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male"
    },
    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      default: "Medium"
    },
    color: String,
    shelterLocation: String,
    imageUrl: String,
    description: String,
    vaccinated: {
      type: Boolean,
      default: false
    },
    adoptionStatus: {
      type: String,
      enum: ["Available", "Reserved", "Adopted", "Medical Hold"],
      default: "Available"
    },

    // 🔥 NEW CONTACT DETAILS
    ownerName: {
      type: String,
      required: true
    },
    ownerPhone: {
      type: String,
      required: true
    },
    ownerEmail: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pet", petSchema);