const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", carController.getCars);
router.post("/", carController.addCar);
router.delete("/:plateNumber", carController.deleteCar);

module.exports = router;
