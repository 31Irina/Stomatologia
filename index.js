const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

// Підключення до PostgreSQL через Render
const pool = new Pool({
    connectionString: 'postgresql://dentistry_system_user:1234ab@dpg-cv3c0gt2ng1s73ftssug-a.oregon-postgres.render.com:5432/dentistry_system',
    ssl: { rejectUnauthorized: false }
});

// Перевірка підключення до бази даних
pool.connect()
    .then(client => {
        console.log('Підключення до бази даних успішне');
        client.release();
    })
    .catch(err => {
        console.error('Помилка підключення до бази даних:', err.message);
    });

// Middleware для обробки JSON і URL-encoded даних
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Налаштування EJS як шаблонізатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Статичні файли (CSS, JS, зображення)
app.use(express.static(path.join(__dirname, 'public')));

// Головна сторінка
app.get('/', (req, res) => {
    res.render('index');
});

// Сторінка послуг
app.get('/services', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services');
        res.render('services', { services: result.rows });
    } catch (err) {
        console.error('Помилка при отриманні послуг:', err);
        res.status(500).send('Помилка сервера');
    }
});

// Сторінка запису на прийом
app.get('/appointments', async (req, res) => {
    try {
        const patientsResult = await pool.query('SELECT * FROM patients');
        const servicesResult = await pool.query('SELECT * FROM services');

        res.render('appointments', { 
            patients: patientsResult.rows, 
            services: servicesResult.rows
        });
    } catch (err) {
        console.error('Помилка при отриманні даних:', err);
        res.status(500).send('Помилка сервера');
    }
});

// Реєстрація пацієнта
app.post('/register-patient', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Усі поля є обов’язковими!' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO patients (name, email, phone) VALUES ($1, $2, $3) RETURNING *', 
            [name, email, phone]
        );

        res.redirect('/appointments'); // Перенаправлення на запис після реєстрації
    } catch (err) {
        console.error('Помилка при реєстрації пацієнта:', err);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

// Створення запису на прийом
app.post('/appointments', async (req, res) => {
    const { patient_id, service_id, appointment_date, status } = req.body;

    if (!patient_id || !service_id || !appointment_date || !status) {
        return res.status(400).json({ error: 'Усі поля є обов’язковими!' });
    }

    try {
        await pool.query(
            'INSERT INTO appointments (patient_id, service_id, appointment_date, status) VALUES ($1, $2, $3, $4)', 
            [patient_id, service_id, appointment_date, status]
        );

        res.redirect('/appointments-list'); // Перенаправлення на список записів
    } catch (err) {
        console.error('Помилка при додаванні запису:', err);
        res.status(500).send('Помилка сервера');
    }
});

// Відображення списку записів на прийом
app.get('/appointments-list', async (req, res) => {
    try {
        const appointmentsResult = await pool.query(`
            SELECT appointments.id, 
                   patients.name AS patient_name, 
                   services.name AS service_name, 
                   appointments.appointment_date, 
                   appointments.status 
            FROM appointments
            JOIN patients ON appointments.patient_id = patients.id
            JOIN services ON appointments.service_id = services.id
        `);

        res.render('appointments-list', { appointments: appointmentsResult.rows });
    } catch (err) {
        console.error('Помилка при отриманні записів:', err);
        res.status(500).send('Помилка сервера');
    }
});

// Відображення списку пацієнтів
app.get('/patients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients');
        res.render('patients', { patients: result.rows });
    } catch (err) {
        console.error('Помилка при отриманні пацієнтів:', err);
        res.status(500).send('Помилка сервера');
    }
});

// Сторінка контактів
app.get('/contacts', (req, res) => {
    res.render('contacts');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});