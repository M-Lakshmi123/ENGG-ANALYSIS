const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'ENGG', // Connect to 'ENGG' (since we know it exists now)
    port: parseInt(process.env.DB_PORT || '4000'),
    ssl: { rejectUnauthorized: true }
};

async function cleanup() {
    try {
        console.log("Connecting to TiDB...");
        const connection = await mysql.createConnection(config);

        console.log("Dropping database 'test'...");
        // WARNING: This deletes the 'test' database and all its tables
        await connection.query("DROP DATABASE IF EXISTS test");

        console.log("✅ Database 'test' has been dropped successfully.");

        await connection.end();
        process.exit(0);

    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}

cleanup();
