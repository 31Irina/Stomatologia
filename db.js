const { Client } = require('pg');

const client = new Client({
    host: 'localhost', // Сервер бази даних
    database: 'dentistry_system', // Ім'я бази
    user: 'postgres', // Твій користувач
    password: '1234ab', // Введи свій пароль PostgreSQL
    port: 5432, // Порт за замовчуванням
});

client.connect()
    .then(() => console.log('✅ Підключено до бази даних'))
    .catch(err => console.error('❌ Помилка підключення', err.stack));

module.exports = client;