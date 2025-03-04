const express = require("express");
const path = require("path");
const app = express();

// Встановлюємо EJS як шаблонний движок
app.set("view engine", "ejs");

// Вказуємо директорію для збереження шаблонів EJS
app.set("views", path.join(__dirname, "views"));

// Статичні файли (CSS, JS, зображення)
app.use(express.static(path.join(__dirname, "public")));

// Головний маршрут для рендерингу сторінки
app.get("/", (req, res) => {
    res.render("index"); // Ваш шаблон 'index.ejs'
});

// Маршрут для послуг
app.get("/services", (req, res) => {
    res.render("services"); // Ваш шаблон 'services.ejs'
});

// Маршрут для пацієнтів
app.get("/patients", (req, res) => {
    res.render("patients"); // Ваш шаблон 'patients.ejs'
});

// Маршрут для запису на прийом
app.get("/appointments", (req, res) => {
    res.render("appointments"); // Ваш шаблон 'appointments.ejs'
});

// Встановлюємо порт для сервера
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});