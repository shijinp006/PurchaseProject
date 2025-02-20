import { db } from "./Db.js";

const ensureTableExists = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Purchases (
         id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_date DATE NOT NULL,
    supplier_name VARCHAR(255) NOT NULL,
    invoice_number VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log("Purchases table is ready.");
  } catch (error) {
    console.error("Error ensuring Purchases table exists:", error.message);
  }
};
ensureTableExists();
export default ensureTableExists;
