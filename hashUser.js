const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

(async () => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "crpms"
    });

    const username = "admin";
    const plainPassword = "123456";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    console.log("✅ User inserted with hashed password");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    process.exit(1);
  }
})();
