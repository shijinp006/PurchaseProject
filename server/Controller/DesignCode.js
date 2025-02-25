import ensureTableExists from '../Models/DesignCodeTable.js';
import ensuredesigncodeItemTableExists from '../Models/Designcodeitemstable.js';
import { db } from '../Models/Db.js';
ensureTableExists();
ensuredesigncodeItemTableExists();
export const AddDesignCode = async (req, res) => {
  const connection = await db.getConnection(); // Get a database connection
  await connection.beginTransaction();
  try {
    const { design_code, fabrics, color_code, status, target_completion_date } =
      req.body;
    console.log(req.body);

    const purchase_id = req.params.id;

    console.log(purchase_id, 'sa');

    if (
      !purchase_id ||
      !design_code ||
      !fabrics ||
      !color_code ||
      !status ||
      !target_completion_date
    ) {
      return res.status(400).json({ error: 'all fields are required' });
    }
    if (
      typeof design_code === 'string' &&
      typeof color_code === 'string' &&
      !isNaN(Date.parse(target_completion_date))
    ) {
      const [ItemResult] = await connection.query(
        'SELECT * FROM DesignCode WHERE design_code = ? LIMIT 1',
        [design_code]
      );
      if (ItemResult.length > 0) {
        console.log(`:warning: Item already exists: ${design_code}`);
        return res
          .status(400)
          .json({ error: 'Item already exists with same design code' });
      }
      const [designcodeResult] = await connection.query(
        'INSERT INTO DesignCode (purchase_id, design_code, color_code, status, target_completion_date) VALUES (?, ?, ?, ?, ?)',
        [purchase_id, design_code, color_code, status, target_completion_date]
      );
      const designcodeId = designcodeResult.insertId;
      if (
        fabrics.every(
          (item) =>
            typeof item.fabric_name === 'string' &&
            typeof item.description === 'string' &&
            !isNaN(Number(item.cons)) &&
            !isNaN(Number(item.qty)) &&
            !isNaN(Number(item.total_mtr))
        )
      ) {
        const insertItemsQuery =
          'INSERT INTO DesignCodeItems (designcode_id, fabric_name, description, cons, qty,total_mtr) VALUES ?';
        const fabricsData = fabrics.map((item) => [
          designcodeId,
          item.fabric_name,
          item.description,
          item.cons,
          item.qty,
          item.total_mtr,
        ]);
        console.log(
          'Inserted Items Successfully:',
          fabrics.map((item) => item.fabric_name)
        );
        await connection.query(insertItemsQuery, [fabricsData]);
        await connection.commit(); // Commit transaction
        connection.release(); // Release connection
        res.status(201).json({ message: 'Design Code created successfully!' });
      } else {
        return res
          .status(400)
          .json({ error: 'enter in valid format for fabrics' });
      }
    } else {
      return res.status(400).json({ error: 'enter in valid format' });
    }
  } catch (error) {
    await connection.rollback(); // Rollback transaction if error occurs
    connection.release();
    console.error('Error adding DesigCode :', error);
    res.status(500).json({ error: 'Failed to add Design Code' });
  }
};

export const getDesignCodeDetails = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM DesignCode'); // Directly query using pool
    res.status(200).json(results);
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({
      error: 'Failed to retrieve Design Code',
      details: error.message,
    });
  }
};

export const getDesignCodeFabricItems = async (req, res) => {
  const designcode_id = req.params.id;

  try {
    const [results] = await db.query(
      'SELECT * FROM DesignCodeItems WHERE designcode_id = ?',
      [designcode_id]
    ); // Directly query using pool
    res.status(200).json(results);
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({
      error: 'Failed to retrieve Design Code',
      details: error.message,
    });
  }
};

export const getDesignCodeDetailsBystatus = async (req, res) => {
  try {
    const designcode_id = req.params.id;

    // Fetch results from all tables
    const [Dyingresults] = await db.query(
      'SELECT * FROM Dying WHERE designcode_id = ?',
      [designcode_id]
    );
    const [QualityCheckresults] = await db.query(
      'SELECT * FROM QualityCheck WHERE designcode_id = ?',
      [designcode_id]
    );
    const [Shippingresults] = await db.query(
      'SELECT * FROM PackingandShipping WHERE designcode_id = ?',
      [designcode_id]
    );
    const [Completeresults] = await db.query(
      'SELECT * FROM Complete WHERE designcode_id = ?',
      [designcode_id]
    );

    // Combine all results into an object
    const responseData = {
      Dying: Dyingresults[0],
      QualityCheck: QualityCheckresults[0],
      Shipping: Shippingresults[0],
      Complete: Completeresults[0],
    };

    console.log(responseData, 'responseData');

    // Send a single JSON response with all results
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
