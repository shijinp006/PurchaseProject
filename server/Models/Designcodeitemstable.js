import { db } from './Db.js';
const ensuredesigncodeItemTableExists = async () => {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS DesignCodeItems (
      id INT AUTO_INCREMENT PRIMARY KEY,
      designcode_id INT NOT NULL,
      fabric_name VARCHAR(100) NOT NULL,
      description TEXT,
      cons DECIMAL(10,2),       -- Consumption (CONS), assumed to be a decimal value
      qty INT,                  -- Quantity (QTY), assumed to be an integer
      total_mtr DECIMAL(10,2),  -- Total meters
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (designcode_id) REFERENCES DesignCode(id) ON DELETE CASCADE
   )`;
  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log('DesignCode item table is ready.');
  } catch (error) {
    console.error(
      'Error ensuring DesignCode item table exists:',
      error.message
    );
  }
};
ensuredesigncodeItemTableExists();
export default ensuredesigncodeItemTableExists;
