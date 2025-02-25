import { db } from './Db.js';

const ensureTableExists = async () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Purchases (
         id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_date DATE NOT NULL,
    purchase_code VARCHAR(255) NOT NULL,
    supplier_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gst_number VARCHAR(255) NOT NULL,
    pan_number VARCHAR(255) NOT NULL,
    agent_name VARCHAR(255) NOT NULL,
    invoice_number VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  try {
    await db.query(createTableQuery); // Now this works because db is promise-based
    console.log('Purchases table is ready.');
  } catch (error) {
    console.error('Error ensuring Purchases table exists:', error.message);
  }
};

export default ensureTableExists;
