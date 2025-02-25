import { db } from './Db.js';
const ensureDesignTableExists = async () => {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS DesignCode (
      id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_id INT NOT NULL,
    design_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    color_code VARCHAR(50),
    target_completion_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (purchase_id) REFERENCES Purchases(id) ON DELETE CASCADE
 )`;
  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log('DesignCode table is ready.');
  } catch (error) {
    console.error('Error ensuring DesignCode table exists:', error.message);
  }
};

export default ensureDesignTableExists;
