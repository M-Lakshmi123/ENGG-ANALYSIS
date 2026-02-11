const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function dropEnggTables() {
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

        console.log("Dropping ENGG_RESULT...");
        await conn.query("DROP TABLE IF EXISTS ENGG_RESULT");
        console.log("✅ Dropped ENGG_RESULT.");

        console.log("Dropping ERP_REPORT_ENGG...");
        await conn.query("DROP TABLE IF EXISTS ERP_REPORT_ENGG");
        console.log("✅ Dropped ERP_REPORT_ENGG.");

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        if (conn) await conn.end();
    }
}

dropEnggTables();
