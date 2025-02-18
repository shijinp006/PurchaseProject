import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import AdminLogin from "./Routes/AdminLoginRout.js";
import Purchase from "./Routes/Purchase.js";
import AddItems from "./Routes/AddItems.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "your_secret_key", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1 hour session
  })
);

//Routes
app.use("/Admin", AdminLogin);
app.use("/Admin", Purchase);
app.use("/Admin", AddItems);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
