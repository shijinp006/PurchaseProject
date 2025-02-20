import { db } from "../Models/Db.js";
import ensureTableExists from "../Models/PurchaseTable.js";
import ensurePurchaseItemsTableExists from "../Models/PurchaseItemsTable.js";

ensureTableExists();
ensurePurchaseItemsTableExists();

export const Purchase = async (req, res) => {
  const connection = await db.getConnection(); // Get a transaction connection
  await connection.beginTransaction(); // Start transaction

  try {
    const {
      supplier_name,
      purchase_date,
      items,
      total_amount,
      status,
      invoice_number,
    } = req.body;
    console.log(invoice_number);

    if (
      !supplier_name ||
      !purchase_date ||
      !items ||
      items.length === 0 ||
      !total_amount ||
      !status
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including items" });
    }

    // ✅ Step 1: Insert Purchase Details
    const [purchaseResult] = await connection.query(
      "INSERT INTO Purchases (supplier_name,  invoice_number, purchase_date, total_amount, status) VALUES (?, ?, ?, ?, ?)",
      [supplier_name, invoice_number, purchase_date, total_amount, status]
    );

    const purchaseId = purchaseResult.insertId;
    console.log("Inserted Purchase ID:", purchaseId);

    // ✅ Step 2: Insert Multiple Items into PurchasesItems Table
    const insertItemsQuery =
      "INSERT INTO PurchasesItems (purchase_id, item_name, quantity,balance_qty, price, total_amount) VALUES ?";

    const itemsData = items.map((item) => [
      purchaseId,
      item.item_name,
      item.quantity,
      item.quantity,
      item.unit_price,
      item.quantity * item.unit_price,
    ]);

    await connection.query(insertItemsQuery, [itemsData]);
    console.log(
      "Inserted Items Successfully:",
      items.map((item) => item.item_name)
    );

    // ✅ Step 3: Update or Insert Items in Items Table
    await Promise.all(
      items.map(async (item) => {
        const [existingItem] = await connection.query(
          "SELECT * FROM Items WHERE item_name = ? LIMIT 1",
          [item.item_name]
        );

        if (existingItem.length > 0) {
          // Update quantity if item exists
          const Quantity = Number(item.quantity);
          const newQuantity = existingItem[0].quantity + Quantity;

          await connection.query(
            "UPDATE Items SET quantity = ? WHERE item_name = ?",
            [newQuantity, item.item_name]
          );
          console.log(
            `Updated Item Quantity: ${item.item_name} => ${newQuantity}`
          );
        } else {
          // Insert new item
          await connection.query(
            "INSERT INTO Items (item_name, quantity) VALUES (?, ?)",
            [item.item_name, item.quantity]
          );
          console.log(`Inserted New Item: ${item.item_name}`);
        }
      })
    );

    // ✅ Commit Transaction
    await connection.commit();
    connection.release(); // Release connection

    console.log("Purchase and Items stored successfully");
    res.status(201).json({ message: "Purchase and Items stored successfully" });
  } catch (error) {
    await connection.rollback(); // Rollback transaction if any error occurs
    connection.release();

    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Database operation failed", details: error.message });
  }
};

export const getPurchaseDetails = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Get a transaction connection
    await connection.beginTransaction(); // Start transaction
    const [purchaseResult] = await connection.query("SELECT * FROM Purchases");

    await connection.commit(); // Commit transaction
    connection.release(); // Release connection

    res.status(200).json({ purchaseResult });
  } catch (error) {}
};

export const getPurchaseItems = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Get a transaction connection
    await connection.beginTransaction(); // Start transaction

    const Id = req.params.Id; // Corrected extraction of id
    console.log(Id, "params Id");

    const [purchaseItemsResult] = await connection.query(
      "SELECT * FROM PurchasesItems WHERE purchase_id = ?",
      [Id]
    );
    await connection.commit(); // Commit transaction
    connection.release(); // Release connection

    res.status(200).json({ purchaseItemsResult });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Database operation failed", details: error.message });
  }
};
