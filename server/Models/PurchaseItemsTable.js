import { db } from "./Db.js";

const ensurePurchaseItemsTableExists = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS PurchasesItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
   
    FOREIGN KEY (purchase_id) REFERENCES Purchases(id) ON DELETE CASCADE
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log("Purchases Items table is ready.");
  } catch (error) {
    console.error(
      "Error ensuring Purchases Items table exists:",
      error.message
    );
  }
};

export default ensurePurchaseItemsTableExists;
