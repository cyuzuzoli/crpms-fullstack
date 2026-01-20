const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

router.get("/", controller.getPayments);
router.post("/", controller.addPayment);
router.delete("/:paymentNumber", controller.deletePayment);

module.exports = router;
