import { db } from "./Models/Db.js";
import bcrypt from "bcrypt";
import closeConnection from "./Models/AdminLoginTable.js";
import ensureTableExists from "./Models/AdminLoginTable.js";
ensureTableExists();
async function run() {
  const signupName = process.argv[2];
  const signupEmail = process.argv[3];
  const signupPassword = process.argv[4];

  const hashedPassword = await bcrypt.hash(signupPassword, 10);
  await db.execute(
    "INSERT INTO Adminlogin (signupName, signupEmail, signupPassword) VALUES (?, ?, ?)",
    [signupName, signupEmail, hashedPassword]
  );
}

run()
  .then(() => {
    console.log("success");
    closeConnection();
  })
  .catch((e) => {
    console.log("error", e);
    closeConnection(0);
  });
