const express = require("express");
const router = express.Router();

const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  adoptPet,
  deletePet
} = require("../controllers/petController");

router.get("/", getAllPets);
router.get("/:id", getPetById);
router.post("/", createPet);
router.put("/:id", updatePet);
router.patch("/:id/adopt", adoptPet);
router.delete("/:id", deletePet);

module.exports = router;