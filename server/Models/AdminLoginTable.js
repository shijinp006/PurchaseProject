import { db } from "./Db.js";

const ensureTableExists = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Adminlogin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        signupName VARCHAR(100) NOT NULL,
        signupEmail VARCHAR(150) UNIQUE NOT NULL,
        signupPassword VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log("AdminLogin table is ready.");
  } catch (error) {
    console.error("Error ensuring AdminLogin table exists:", error.message);
  }
};
ensureTableExists();
export default ensureTableExists;
