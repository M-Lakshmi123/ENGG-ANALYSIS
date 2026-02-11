const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function checkMedicalData() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 4000,
        ssl: { rejectUnauthorized: true }
    };

    let conn;
    try {
        conn = await mysql.createConnection(config);
        console.log("Connected to DB.");

        const [rows] = await conn.query("SELECT COUNT(*) as count FROM MEDICAL_RESULT");
        console.log(`✅ MEDICAL_RESULT Check: Table exists and contains ${rows[0].count} records.`);

    } catch (err) {
        console.error("❌ Error checking MEDICAL_RESULT:", err.message);
    } finally {
        if (conn) await conn.end();
    }
}

checkMedicalData();
