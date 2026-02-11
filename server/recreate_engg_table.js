const { connectToDb } = require('./db');

async function resetTable() {
    try {
        const pool = await connectToDb();
        console.log("Dropping old table...");
        await pool.request().query("DROP TABLE IF EXISTS ENGG_RESULT");

        console.log("Creating table with correct schema...");
        const createTableSql = `
            CREATE TABLE ENGG_RESULT (
                Test VARCHAR(255) NOT NULL,
                DATE DATE NOT NULL,
                STUD_ID VARCHAR(255) NOT NULL,
                NAME_OF_THE_STUDENT VARCHAR(255) NOT NULL,
                CAMPUS_NAME VARCHAR(255) NOT NULL,
                Total INT,
                Total_Per INT,
                AIR INT,
                MAT INT,
                MAT_Per INT,
                M_Rank INT,
                PHY INT,
                PHY_Per INT,
                P_Rank INT,
                CHE INT,
                CHE_Per INT,
                C_Rank INT,
                Batch VARCHAR(255),
                Year VARCHAR(50),
                Top_ALL VARCHAR(50),
                P1_P2 VARCHAR(50),
                Best_of_three VARCHAR(50),
                Below_1000_Target VARCHAR(50),
                Jee_Mains_Target VARCHAR(50)
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `;
        await pool.request().query(createTableSql);
        console.log("✅ Table 'ENGG_RESULT' recreated successfully with correct columns.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
}

resetTable();
