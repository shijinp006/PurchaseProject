import { db } from './Db.js';

const ensureFabricTableExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS FabricPurchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designcode_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    attachment VARCHAR(255),
     FOREIGN KEY (designcode_id) REFERENCES DesignCode(id) ON DELETE CASCADE
    
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log('Fabric Purchases table is ready.');
  } catch (error) {
    console.error(
      'Error ensuring Fabric Purchases table exists:',
      error.message
    );
  }
};

export default ensureFabricTableExists;
