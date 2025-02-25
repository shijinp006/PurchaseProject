import { db } from '../Models/Db.js';
import ensurePackingandShippingTableExists from '../Models/Packing&ShippingTable.js';
ensurePackingandShippingTableExists();

import Joi from 'joi';

export const Shipping = async (req, res) => {
  try {
    // **1️⃣ Validate Input Data (API Validation)**
    const schema = Joi.object({
      address: Joi.string().trim().min(3).max(255).required(),
      estimated_date: Joi.date().iso().required(),
      date: Joi.date().iso().required(),
      attachment: Joi.string(), // Optional (must be a valid URL)
      note: Joi.string().trim().max(500).optional().allow(''), // Optional (max 500 chars)
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { address, estimated_date, date, attachment, note } = value;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    const Designcode_id = req.params.id;

    // **2️⃣ Check if Dying Record Exists**
    const [QualityCheck] = await connection.query(
      'SELECT * FROM QualityCheck WHERE designcode_id = ?',
      [Designcode_id]
    );

    if (QualityCheck.length === 0) {
      connection.release(); // Release connection
      return res.status(404).json({ error: 'Quality Check records not found' });
    }

    const status = 'Packing & Shipping';

    // **3️⃣ Update Staus**
    await connection.query('UPDATE DesignCode SET status = ? WHERE id = ?', [
      status,
      Designcode_id,
    ]);

    const query =
      'INSERT INTO PackingandShipping (designcode_id, address, estimated_date, date, attachment, notes) VALUES (?, ?, ?, ?, ?,?)';
    const values = [
      Designcode_id,
      address,
      estimated_date,
      date,
      attachment,
      note,
    ];

    // **2️⃣ Insert Data into the database**
    await connection.query(query, values);

    await connection.commit();
    connection.release();

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
