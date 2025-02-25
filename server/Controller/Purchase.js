import { db } from '../Models/Db.js';
import ensureTableExists from '../Models/PurchaseTable.js';
import ensurePurchaseItemsTableExists from '../Models/PurchaseItemsTable.js';
import ensureFabricTableExists from '../Models/FabricPurchaseTable.js';

ensureFabricTableExists();
ensureTableExists();
ensurePurchaseItemsTableExists();

export const Purchase = async (req, res) => {
  const connection = await db.getConnection(); // Get a transaction connection
  await connection.beginTransaction(); // Start transaction

  try {
    const {
      purchasecode,
      supplier_name,
      address,
      phonenumber,
      gstnumber,
      pannumber,
      agentname,
      purchase_date,
      items,
      total_amount,
      status,
      invoice_number,
    } = req.body;
    console.log(req.body);

    // ✅ Validate supplier_name, status, and invoice_number as non-empty strings
    if (
      !purchasecode ||
      !supplier_name ||
      !address ||
      !phonenumber ||
      !gstnumber ||
      !pannumber ||
      !agentname ||
      !purchase_date ||
      !items ||
      !total_amount ||
      !status ||
      !invoice_number
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // ✅ Validate purchase_date as a valid date
    if (isNaN(Date.parse(purchase_date))) {
      return res.status(400).json({ error: 'Invalid purchase_date format.' });
    }

    // ✅ Validate total_amount as a number
    if (typeof total_amount !== 'number' || total_amount <= 0) {
      return res
        .status(400)
        .json({ error: 'Invalid total_amount. Must be a positive number.' });
    }

    // ✅ Validate items as a non-empty array of objects
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'Invalid items. Must be a non-empty array.',
      });
    }

    // ✅ Validate each item in the items array
    for (const item of items) {
      if (
        typeof item.item_name !== 'string' ||
        !item.item_name.trim() ||
        typeof item.quantity !== 'number' ||
        item.quantity <= 0 ||
        typeof item.unit_price !== 'number' ||
        item.unit_price <= 0
      ) {
        return res.status(400).json({
          error:
            'Invalid items data. Each item must have a valid item_name (string), quantity (positive number), and unit_price (positive number).',
        });
      }
    }

    // ✅ Step 1: Insert Purchase Details
    const [purchaseResult] = await connection.query(
      'INSERT INTO Purchases ( purchase_date,purchase_code, supplier_name,address, phone_number, gst_number, pan_number, agent_name, invoice_number, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        purchase_date,
        purchasecode,
        supplier_name,
        address,
        phonenumber,
        gstnumber,
        pannumber,
        agentname,
        invoice_number,
        total_amount,
        status,
      ]
    );

    const purchaseId = purchaseResult.insertId;
    console.log('Inserted Purchase ID:', purchaseId);

    // ✅ Step 2: Insert Multiple Items into PurchasesItems Table
    const insertItemsQuery =
      'INSERT INTO PurchasesItems (purchase_id, item_name, quantity, balance_qty, price, total_amount) VALUES ?';

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
      'Inserted Items Successfully:',
      items.map((item) => item.item_name)
    );

    // ✅ Step 3: Update or Insert Items in Items Table
    await Promise.all(
      items.map(async (item) => {
        const [existingItem] = await connection.query(
          'SELECT * FROM Items WHERE item_name = ? LIMIT 1',
          [item.item_name]
        );

        if (existingItem.length > 0) {
          // Update quantity if item exists
          const newQuantity = existingItem[0].quantity + item.quantity;

          await connection.query(
            'UPDATE Items SET quantity = ? WHERE item_name = ?',
            [newQuantity, item.item_name]
          );
          console.log(
            `Updated Item Quantity: ${item.item_name} => ${newQuantity}`
          );
        } else {
          // Insert new item
          await connection.query(
            'INSERT INTO Items (item_name, quantity) VALUES (?, ?)',
            [item.item_name, item.quantity]
          );
          console.log(`Inserted New Item: ${item.item_name}`);
        }
      })
    );

    // ✅ Commit Transaction
    await connection.commit();
    connection.release(); // Release connection

    console.log('Purchase and Items stored successfully');
    res.status(201).json({ message: 'Purchase and Items stored successfully' });
  } catch (error) {
    await connection.rollback(); // Rollback transaction if any error occurs
    connection.release();

    console.error('Database error:', error);
    res
      .status(500)
      .json({ error: 'Database operation failed', details: error.message });
  }
};

export const getPurchaseDetails = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Get a transaction connection
    await connection.beginTransaction(); // Start transaction
    const [purchaseResult] = await connection.query('SELECT * FROM Purchases');

    await connection.commit(); // Commit transaction
    connection.release(); // Release connection

    res.status(200).json({ purchaseResult });
  } catch (error) {}
};

export const getPurchaseItems = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Get a transaction connection
    await connection.beginTransaction(); // Start transaction

    const Purchase_Id = req.params.Id; // Corrected extraction of id
    console.log(Purchase_Id, 'params Id');

    const [purchaseItemsResult] = await connection.query(
      'SELECT * FROM PurchasesItems WHERE purchase_id = ?',
      [Purchase_Id]
    );
    await connection.commit(); // Commit transaction
    connection.release(); // Release connection

    res.status(200).json({ purchaseItemsResult });
  } catch (error) {
    console.error('Database error:', error);
    res
      .status(500)
      .json({ error: 'Database operation failed', details: error.message });
  }
};
