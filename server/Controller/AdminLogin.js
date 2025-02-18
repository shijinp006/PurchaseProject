import ensureTableExists from "../Models/AdminLoginTable.js";
import { db } from "../Models/Db.js";
import bcrypt from "bcrypt";

ensureTableExists();

// Helper function to execute database queries
const executeQuery = async (query, params) => {
  try {
    const [result] = await db.execute(query, params);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database operation failed");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    req.session.user = email;
    console.log(req.session.user, "session");

    console.log(email);

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find the admin by email
    const adminResult = await executeQuery(
      "SELECT * FROM Adminlogin WHERE signupEmail = ?",
      [email]
    );

    if (!adminResult.length) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const admin = adminResult[0];

    // Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, admin.signupPassword);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return success response with admin details (excluding password)
    return res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin.id,
        email: admin.signupEmail,
        name: admin.signupName,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const AdminLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
