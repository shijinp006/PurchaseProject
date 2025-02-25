import { db } from './Db.js';

const ensureCompleteTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Complete (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designcode_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    attachment VARCHAR(255),
    notes VARCHAR(255),

    FOREIGN KEY (designcode_id) REFERENCES DesignCode(id) ON DELETE CASCADE
    
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log('Complete table is ready.');
  } catch (error) {
    console.error('Error ensuring Complete table exists:', error.message);
  }
};

export default ensureCompleteTableExists;
