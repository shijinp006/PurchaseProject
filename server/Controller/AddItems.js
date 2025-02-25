import ensureTableExists from '../Models/ItemsTable.js';
import { db } from '../Models/Db.js';

ensureTableExists();

export const AddItems = async (req, res) => {
  const connection = await db.getConnection(); // Get a database connection
  await connection.beginTransaction(); // Start transaction

  try {
    const { item_name, quantity } = req.body;

    // ✅ Input Validation: Check if item_name and quantity exist
    if (typeof item_name !== 'string' || typeof quantity === 'undefined') {
      return res.status(400).json({ error: 'Invalid input types' });
    }

    // ✅ Validate item_name: Must be a non-empty string
    if (!item_name.trim()) {
      return res.status(400).json({ error: 'Item name cannot be empty' });
    }

    // ✅ Validate quantity: Must be a positive integer
    if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
      return res
        .status(400)
        .json({ error: 'Quantity must be a positive number' });
    }

    console.log('Adding Item:', item_name, 'Quantity:', quantity);

    // ✅ Check if the item already exists
    const [ItemResult] = await connection.query(
      'SELECT * FROM Items WHERE item_name = ? LIMIT 1',
      [item_name]
    );

    if (ItemResult.length > 0) {
      console.log(`⚠️ Item already exists: ${item_name}`);
      return res.status(400).json({ error: 'Item already exists' });
    }

    // ✅ Insert new item into the database
    await connection.query(
      'INSERT INTO Items (item_name, quantity) VALUES (?, ?)',
      [item_name, quantity]
    );

    await connection.commit(); // Commit transaction
    connection.release(); // Release connection

    res.status(201).json({ message: 'Item added successfully!' });
  } catch (error) {
    await connection.rollback(); // Rollback transaction if error occurs
    connection.release();

    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
};

export const getItems = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM Items'); // Directly query using pool
    res.status(200).json(results);
  } catch (error) {
    console.error('Database error:', error.message);
    res
      .status(500)
      .json({ error: 'Failed to retrieve items', details: error.message });
  }
};
