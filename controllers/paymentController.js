const db = require("../db");

/**
 * GET ALL PAYMENTS
 */
exports.getPayments = async (req, res) => {
  try {
    const [payments] = await db.query(
      "SELECT * FROM payment ORDER BY paymentDate DESC"
    );
    res.json(payments);
  } catch (err) {
    console.error("GET PAYMENTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * ADD PAYMENT
 */
exports.addPayment = async (req, res) => {
  try {
    const { recordNumber, amountPaid } = req.body;

    if (!recordNumber || !amountPaid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // generate payment number
    const paymentNumber = "PAY-" + Date.now();

    await db.query(
      `INSERT INTO payment 
       (paymentNumber, recordNumber, amountPaid, paymentDate)
       VALUES (?, ?, ?, NOW())`,
      [paymentNumber, recordNumber, amountPaid]
    );

    res.status(201).json({ message: "Payment added successfully" });
  } catch (err) {
    console.error("ADD PAYMENT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE PAYMENT
 */
exports.deletePayment = async (req, res) => {
  try {
    const { paymentNumber } = req.params;

    await db.query(
      "DELETE FROM payment WHERE paymentNumber = ?",
      [paymentNumber]
    );

    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error("DELETE PAYMENT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
