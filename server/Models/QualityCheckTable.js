import { db } from './Db.js';

const ensureQualityCheckTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS QualityCheck (
    id INT AUTO_INCREMENT PRIMARY KEY,
   designcode_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    estimated_date DATE NOT NULL,
    date DATE NOT NULL,
    attachment VARCHAR(255),
    notes VARCHAR(255),

    FOREIGN KEY (designcode_id) REFERENCES DesignCode(id) ON DELETE CASCADE
    
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log('Quality Check  table is ready.');
  } catch (error) {
    console.error('Error ensuring Quality Check table exists:', error.message);
  }
};

export default ensureQualityCheckTableExists;
