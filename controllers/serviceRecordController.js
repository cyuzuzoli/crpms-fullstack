const db = require("../db");

/**
 * GET ALL SERVICE RECORDS
 */
exports.getServiceRecords = async (req, res) => {
  try {
    const [records] = await db.query(`
  SELECT 
    sr.recordNumber,
    sr.plateNumber,
    sr.serviceCode,
    s.serviceName,
    sr.serviceDate
  FROM servicerecord sr
  INNER JOIN services s 
    ON sr.serviceCode = s.serviceCode
  ORDER BY sr.serviceDate DESC
`);
    res.json(records);
  } catch (err) {
    console.error("GET RECORDS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * ADD SERVICE RECORD
 */
exports.addServiceRecord = async (req, res) => {
  try {
    const { recordNumber, plateNumber, serviceCode, serviceDate } = req.body;

    if (!recordNumber || !plateNumber || !serviceCode || !serviceDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.query(
      `INSERT INTO servicerecord 
       (recordNumber, plateNumber, serviceCode, serviceDate)
       VALUES (?, ?, ?, ?)`,
      [recordNumber, plateNumber, serviceCode, serviceDate]
    );

    res.status(201).json({ message: "Service record added successfully" });
  } catch (err) {
    console.error("ADD RECORD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE SERVICE RECORD
 */
exports.deleteServiceRecord = async (req, res) => {
  try {
    const { recordNumber } = req.params;

    await db.query(
      "DELETE FROM servicerecord WHERE recordNumber = ?",
      [recordNumber]
    );

    res.json({ message: "Service record deleted successfully" });
  } catch (err) {
    console.error("DELETE RECORD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
