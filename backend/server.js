const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://product-demo-lilac-three.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Tạo pool kết nối MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "testdb",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

// Test kết nối
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Kết nối đến MySQL thành công!");
    connection.release();
  } catch (err) {
    console.error("❌ Kết nối MySQL thất bại:", err.message);
  }
}
testConnection();

// API lấy danh sách sản phẩm
app.get("/product", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Products");
    res.json(rows);
  } catch (error) {
    console.error("❌ Lỗi query:", error.message);
    res.status(500).json({ message: "Lỗi server 123456" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server chạy tại http://localhost:${port}`);
});
