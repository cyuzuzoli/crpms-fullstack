const express = require("express");
const router = express.Router();
const serviceRecordController = require("../controllers/serviceRecordController");

router.get("/", serviceRecordController.getServiceRecords);
router.post("/", serviceRecordController.addServiceRecord);

module.exports = router;
