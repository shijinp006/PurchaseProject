import { db } from "./Db.js";

const ensureTableExists = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Items (
           id INT AUTO_INCREMENT PRIMARY KEY,
   item_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 0
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log(" Items table is ready.");
  } catch (error) {
    console.error("Error ensuring  Items table exists:", error.message);
  }
};
ensureTableExists();
export default ensureTableExists;
