const { connectToDb } = require('./db');

async function checkColumns() {
    try {
        const pool = await connectToDb();
        const res = await pool.request().query("SHOW COLUMNS FROM ENGG_RESULT");
        console.log('Columns in ENGG_RESULT:');
        res.recordset.forEach(col => {
            console.log(`- ${col.Field} (${col.Type})`);
        });
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkColumns();
