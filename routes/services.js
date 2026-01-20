const express = require("express");
const router = express.Router();
const controller = require("../controllers/servicesController");

router.get("/", controller.getServices);
router.post("/", controller.addService);
router.delete("/:serviceCode", controller.deleteService);

module.exports = router;
