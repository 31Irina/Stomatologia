const client = require('./db');

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Помилка запиту:', err);
    } else {
        console.log('✅ Час у базі даних:', res.rows[0].now);
    }
    client.end(); // Закриваємо підключення
});