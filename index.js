const express = require("express");
const path = require("path");
const app = express();

// Встановлюємо EJS як шаблонний движок
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Вказуємо папку для шаблонів

// Статичні файли (CSS, JS, зображення)
app.use(express.static(path.join(__dirname, "public")));

// Головна сторінка
app.get("/", (req, res) => {
    res.render("index"); // Повертаємо головну сторінку
});

// Сторінка послуг
app.get("/services", (req, res) => {
    res.render("services"); // Повертаємо сторінку послуг
});

// Інші сторінки
app.get("/patients", (req, res) => {
    res.render("patients"); // Повертаємо сторінку пацієнтів
});
app.get("/appointments", (req, res) => {
    res.render("appointments"); // Повертаємо сторінку запису
});

// Встановлюємо порт для сервера
app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
});