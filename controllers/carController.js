const db = require("../db");

// GET ALL CARS
exports.getCars = async (req, res) => {
  try {
    const [cars] = await db.query("SELECT * FROM car");
    res.json(cars);
  } catch (err) {
    console.error("GET CARS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ADD CAR
exports.addCar = async (req, res) => {
  try {
    const {
      plateNumber,
      type,
      model,
      manufacturingYear,
      driverPhone,
      mechanicName
    } = req.body;

    if (!plateNumber || !type || !model) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await db.query(
      `INSERT INTO car 
      (plateNumber, type, model, manufacturingYear, driverPhone, mechanicName)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [plateNumber, type, model, manufacturingYear, driverPhone, mechanicName]
    );

    res.json({ message: "Car added successfully" });
  } catch (err) {
    console.error("ADD CAR ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE CAR
exports.deleteCar = async (req, res) => {
  try {
    const { plateNumber } = req.params;

    await db.query("DELETE FROM car WHERE plateNumber = ?", [plateNumber]);

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("DELETE CAR ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
