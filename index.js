const express = require("express");
const path = require("path");
const app = express();

// Встановлюємо EJS як шаблонний движок
app.set("view engine", "ejs");

// Вказуємо директорію для шаблонів EJS
app.set("views", path.join(__dirname, "views"));

// Підключаємо статичні файли (CSS, зображення, JS)
app.use(express.static(path.join(__dirname, "public")));

// Головна сторінка
app.get("/", (req, res) => {
    res.render("index");
});

// Сторінка "Послуги"
app.get("/services", (req, res) => {
    const services = [
        { name: "Чищення зубів", description: "Професійна чистка зубів для здорової посмішки." },
        { name: "Пломбування", description: "Якісне пломбування з використанням сучасних матеріалів." },
        { name: "Відбілювання", description: "Безпечне відбілювання зубів для білосніжної посмішки." }
    ];
    res.render("services", { services });
});

// Сторінка "Пацієнти"
app.get("/patients", (req, res) => {
    const patients = [
        { name: "Іван Петров", email: "ivan@example.com" },
        { name: "Марія Іванова", email: "maria@example.com" }
    ];
    res.render("patients", { patients });
});

// Сторінка "Запис на прийом"
app.get("/appointments", (req, res) => {
    res.render("appointments");
});

// Встановлюємо порт
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});