import { db } from '../Models/Db.js';

import ensureDyingTableExists from '../Models/DyingTable.js';

ensureDyingTableExists();

import Joi from 'joi';

export const AddDyingDetails = async (req, res) => {
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

    // **2️⃣ Database Connection**
    const connection = await db.getConnection();
    await connection.beginTransaction();
    const Designcode_id = req.params.id;
    console.log(Designcode_id, 'id');
    // **3️⃣ Check if `DesignCode_id` Exists**
    const [designCode] = await connection.query(
      'SELECT * FROM DesignCode WHERE id = ?',
      [Designcode_id]
    );

    if (!designCode.length) {
      await connection.rollback();
      return res.status(404).json({ error: 'DesignCode not found' });
    }

    const status = 'Dying';

    await connection.query('UPDATE DesignCode SET status = ? WHERE id = ?', [
      status,
      Designcode_id,
    ]);

    // **4️⃣ Insert into `Dying` Table**
    const [dyingResult] = await connection.query(
      'INSERT INTO Dying (designcode_id, address, estimated_date, date, attachment, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [Designcode_id, address, estimated_date, date, attachment, note]
    );

    // **5️⃣ Commit Transaction & Release Connection**
    await connection.commit();
    connection.release();

    res.status(201).json({
      success: true,
      message: 'Dying details added successfully',
      dyingResult,
    });
  } catch (error) {
    console.error('Database error:', error);

    res.status(500).json({
      error: 'Database operation failed',
      details: error.message,
    });
  }
};
