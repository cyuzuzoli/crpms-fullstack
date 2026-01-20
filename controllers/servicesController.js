const db = require("../db");

exports.getServices = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM services");
  res.json(rows);
};

exports.addService = async (req, res) => {
  const { serviceName, servicePrice } = req.body;
  if (!serviceName || !servicePrice)
    return res.status(400).json({ message: "Missing fields" });

  await db.query(
    "INSERT INTO services (serviceName, servicePrice) VALUES (?, ?)",
    [serviceName, servicePrice]
  );

  res.json({ message: "Service added" });
};

exports.deleteService = async (req, res) => {
  const { serviceCode } = req.params;
  await db.query("DELETE FROM services WHERE serviceCode = ?", [serviceCode]);
  res.json({ message: "Service deleted" });
};
