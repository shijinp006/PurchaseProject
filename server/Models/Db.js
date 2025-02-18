import mysql from "mysql2";

export const db = mysql
  .createPool({
    host: "localhost", // ✅ Use the MySQL service name from docker-compose.yml
    user: "myuser",
    password: "mypassword",
    database: "purchase project",
    port: 3307, // ✅ Inside Docker, MySQL runs on port 3306
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();
