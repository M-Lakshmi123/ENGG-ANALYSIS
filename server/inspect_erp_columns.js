const { connectToDb } = require('./db');
async function run() {
    try {
        const pool = await connectToDb();
        const res = await pool.request().query("SHOW COLUMNS FROM ERP_REPORT_ENGG");
        console.log('Columns in ERP_REPORT_ENGG:');
        res.recordset.forEach(col => console.log(`- ${col.Field}`));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}
run();
