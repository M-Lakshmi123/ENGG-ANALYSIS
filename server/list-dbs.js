const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function checkDbs() {
    try {
        const config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT) || 4000,
            ssl: { rejectUnauthorized: true }
        };

        const conn = await mysql.createConnection(config);
        const [rows] = await conn.query("SHOW DATABASES");
        console.log("Databases found:", rows.map(r => r.Database));
        await conn.end();
    } catch (err) {
        console.error("Error:", err.message);
    }
}

checkDbs();
