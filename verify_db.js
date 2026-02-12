const { connectToDb } = require('./server/db');

async function verify() {
    try {
        const pool = await connectToDb();

        console.log("--- TABLE: ENGG_RESULT ---");
        const columns = await pool.request().query("DESCRIBE ENGG_RESULT");
        console.log("Columns:", columns.recordset.map(r => r.Field).join(', '));

        const count = await pool.request().query("SELECT COUNT(*) as cnt FROM ENGG_RESULT");
        console.log("Row Count:", count.recordset[0].cnt);

        if (count.recordset[0].cnt > 0) {
            const sample = await pool.request().query("SELECT * FROM ENGG_RESULT LIMIT 1");
            console.log("Sample Data:", JSON.stringify(sample.recordset[0], null, 2));

            console.log("\n--- DISTINCT VALUES for Cascading ---");
            const campuses = await pool.request().query("SELECT DISTINCT CAMPUS_NAME FROM ENGG_RESULT LIMIT 5");
            console.log("Campuses (first 5):", campuses.recordset.map(r => r.CAMPUS_NAME).join(', '));

            const batches = await pool.request().query("SELECT DISTINCT Batch FROM ENGG_RESULT LIMIT 5");
            console.log("Batches (first 5):", batches.recordset.map(r => r.Batch).join(', '));
        }

        console.log("\n--- TABLE: ERP_REPORT_ENGG ---");
        const erpColumns = await pool.request().query("DESCRIBE ERP_REPORT_ENGG");
        console.log("Columns:", erpColumns.recordset.map(r => r.Field).join(', '));

        const erpCount = await pool.request().query("SELECT COUNT(*) as cnt FROM ERP_REPORT_ENGG");
        console.log("Row Count:", erpCount.recordset[0].cnt);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

verify();
