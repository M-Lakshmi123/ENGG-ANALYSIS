const { connectToDb } = require('./db');

async function createTables() {
    let pool;
    try {
        pool = await connectToDb();
        console.log("Connected to TiDB. Re-creating tables with ENGG schema (Safe Mode)...");

        // --- DROP EXISTING ENGG TABLES ONLY ---
        try {
            await pool.request().query('DROP TABLE IF EXISTS ERP_REPORT_ENGG');
            console.log("Dropped existing ERP_REPORT_ENGG.");
        } catch (e) { }
        try {
            await pool.request().query('DROP TABLE IF EXISTS ENGG_RESULT');
            console.log("Dropped existing ENGG_RESULT.");
        } catch (e) { }

        console.log("ℹ️  Skipping DROP of MEDICAL_RESULT and ERP_REPORT to preserve original data.");

        // --- 1. Create ERP_REPORT_ENGG Table ---
        const createErpSql = `
            CREATE TABLE ERP_REPORT_ENGG (
                STUD_ID VARCHAR(255),
                Student_Name VARCHAR(255),
                Branch VARCHAR(255),
                Exam_Date DATE,
                Test_Type VARCHAR(100),
                Test VARCHAR(255),
                TOT VARCHAR(50),
                TOT_P VARCHAR(50),
                AIR VARCHAR(50),
                MAT VARCHAR(50),
                MAT_R VARCHAR(50),
                MAT_P VARCHAR(50),
                PHY VARCHAR(50),
                PHY_R VARCHAR(50),
                PHY_P VARCHAR(50),
                CHE VARCHAR(50),
                CHE_R VARCHAR(50),
                CHE_P VARCHAR(50),
                Q_No INT,
                W_U VARCHAR(50),
                Q_URL TEXT,
                S_URL TEXT,
                Key_Value VARCHAR(50),
                Subject VARCHAR(100),
                Topic VARCHAR(255),
                Sub_Topics VARCHAR(255),
                Question_Type VARCHAR(50),
                Sources VARCHAR(255),
                Original_Replica VARCHAR(255),
                Level VARCHAR(50),
                Year VARCHAR(50),
                Top_ALL VARCHAR(50),
                P1_P2 VARCHAR(50)
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `;
        await pool.request().query(createErpSql);
        console.log("✅ Table 'ERP_REPORT_ENGG' created successfully.");

        // --- 2. Create ENGG_RESULT Table ---
        const createEnggSql = `
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
        await pool.request().query(createEnggSql);
        console.log("✅ Table 'ENGG_RESULT' created successfully.");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error creating tables:", err);
        process.exit(1);
    }
}

createTables();
