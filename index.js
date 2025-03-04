const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = process.env.PORT || 10000;

// 📌 Підключення до PostgreSQL (використовує змінні середовища Render)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Render надає цю змінну автоматично
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// 📌 Налаштування EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 📌 Статичні файли (CSS, JS, зображення)
app.use(express.static(path.join(__dirname, "public")));

// 📌 Головна сторінка
app.get("/", (req, res) => {
    res.render("index");
});

// 📌 Сторінка "Послуги" (дані з БД)
app.get("/services", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM services");
        res.render("services", { services: result.rows });
    } catch (err) {
        console.error("Помилка при отриманні послуг:", err);
        res.status(500).send("Помилка сервера");
    }
});

// 📌 Сторінка "Пацієнти"
app.get("/patients", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM patients");
        res.render("patients", { patients: result.rows });
    } catch (err) {
        console.error("Помилка при отриманні пацієнтів:", err);
        res.status(500).send("Помилка сервера");
    }
});

// 📌 Сторінка "Запис на прийом"
app.get("/appointments", async (req, res) => {
    try {
        const patientsResult = await pool.query("SELECT * FROM patients");
        const servicesResult = await pool.query("SELECT * FROM services");

        res.render("appointments", { 
            patients: patientsResult.rows, 
            services: servicesResult.rows 
        });
    } catch (err) {
        console.error("Помилка при отриманні даних:", err);
        res.status(500).send("Помилка сервера");
    }
});

// 📌 Запуск сервера
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});