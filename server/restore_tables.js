const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function restoreTables() {
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

        // 1. Attempt Restore MEDICAL_RESULT
        console.log("Attempting to restore MEDICAL_RESULT...");
        try {
            // Try restoring to original name
            await conn.query("FLASHBACK TABLE MEDICAL_RESULT");
            console.log("✅ FLASHBACK TABLE MEDICAL_RESULT SUCCESS!");
        } catch (e) {
            console.error("⚠️ FLASHBACK MEDICAL_RESULT (Original Name) Failed:", e.message);
            // Try renaming just in case
            try {
                await conn.query("FLASHBACK TABLE MEDICAL_RESULT TO MEDICAL_RESULT_RESTORED");
                console.log("✅ FLASHBACK TABLE MEDICAL_RESULT SUCCESS (as MEDICAL_RESULT_RESTORED)!");
            } catch (ex) {
                console.error("❌ FLASHBACK MEDICAL_RESULT COMPLETELY FAILED:", ex.message);
            }
        }

        // 2. Attempt Restore ERP_REPORT
        console.log("Attempting to restore ERP_REPORT...");
        try {
            await conn.query("FLASHBACK TABLE ERP_REPORT");
            console.log("✅ FLASHBACK TABLE ERP_REPORT SUCCESS!");
        } catch (e) {
            console.error("⚠️ FLASHBACK ERP_REPORT (Original Name) Failed:", e.message);
            try {
                await conn.query("FLASHBACK TABLE ERP_REPORT TO ERP_REPORT_RESTORED");
                console.log("✅ FLASHBACK TABLE ERP_REPORT SUCCESS (as ERP_REPORT_RESTORED)!");
            } catch (ex) {
                console.error("❌ FLASHBACK ERP_REPORT COMPLETELY FAILED:", ex.message);
            }
        }

    } catch (err) {
        console.error("Connection Error:", err.message);
    } finally {
        if (conn) await conn.end();
    }
}

restoreTables();
