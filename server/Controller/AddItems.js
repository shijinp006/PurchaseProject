import ensureTableExists from "../Models/ItemsTable.js";
import { db } from "../Models/Db.js";

ensureTableExists();

const executeQuery = async (query, params) => {
  try {
    const [result] = await db.execute(query, params);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database operation failed");
  }
};

export const AddItems = async (req, res) => {
  const connection = await db.getConnection(); // Get a database connection
  await connection.beginTransaction(); // Start transaction

  try {
    const { item_name, quantity } = req.body;

    // ✅ Input Validation
    if (!item_name || !quantity) {
      return res
        .status(400)
        .json({ error: "Item name and quantity are required" });
    }

    const Quantity = Number(quantity); // Convert quantity to a number
    if (isNaN(Quantity) || Quantity < 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive number" });
    }

    console.log("Adding Item:", item_name, "Quantity:", Quantity);

    // ✅ Check if the item already exists
    const [ItemResult] = await connection.query(
      "SELECT * FROM Items WHERE item_name = ? LIMIT 1",
      [item_name]
    );

    if (ItemResult.length > 0) {
      console.log(`⚠️ Item already exists: ${item_name}`);
      return res.status(400).json({ error: "Item already exists" });
    }

    // ✅ Insert new item into the database
    await connection.query(
      "INSERT INTO Items (item_name, quantity) VALUES (?, ?)",
      [item_name, Quantity]
    );

    await connection.commit(); // Commit transaction
    connection.release(); // Release connection

    res.status(201).json({ message: "Item added successfully!" });
  } catch (error) {
    await connection.rollback(); // Rollback transaction if error occurs
    connection.release();

    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
};
