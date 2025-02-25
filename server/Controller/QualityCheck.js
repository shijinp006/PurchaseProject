import { db } from '../Models/Db.js';
import ensureQualityCheckTableExists from '../Models/QualityCheckTable.js';
import Joi from 'joi';

ensureQualityCheckTableExists();

export const QualityCheck = async (req, res) => {
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

    const Designcode_id = req.params.id;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    // **2️⃣ Check if Dying Record Exists**
    const [CheckDying] = await connection.query(
      'SELECT * FROM Dying WHERE designcode_id= ?',
      [Designcode_id]
    );

    if (CheckDying.length === 0) {
      connection.release();
      return res.status(400).json({ error: 'Dying record not found' });
    }

    const status = 'Quality Check';

    // // **3️⃣ Update Staus**
    await connection.query('UPDATE DesignCode SET status = ? WHERE id= ?', [
      status,
      Designcode_id,
    ]);

    // **3️⃣ Insert Quality Check Record**
    const [results] = await connection.query(
      'INSERT INTO QualityCheck (designcode_id, address, estimated_date, date, attachment, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [
        Designcode_id,
        address,
        estimated_date,
        date,
        attachment || null,
        note || null,
      ]
    );

    await connection.commit();
    connection.release();

    if (results.affectedRows === 1) {
      return res
        .status(201)
        .json({ message: 'Quality Check added successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to add Quality Check' });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res
      .status(500)
      .json({ error: 'Database operation failed', details: error.message });
  }
};
