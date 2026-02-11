const { connectToDb } = require('./db');

async function check() {
    try {
        const pool = await connectToDb();
        const res = await pool.request().query('SELECT COUNT(*) as count FROM ENGG_RESULT');
        console.log('Total Rows in ENGG_RESULT:', res.recordset[0].count);

        const sample = await pool.request().query('SELECT * FROM ENGG_RESULT LIMIT 5');
        console.log('Sample Row Data:', JSON.stringify(sample.recordset, null, 2));

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

check();
