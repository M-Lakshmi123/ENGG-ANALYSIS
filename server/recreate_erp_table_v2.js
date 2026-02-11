const { connectToDb } = require('./db');
async function run() {
    try {
        const pool = await connectToDb();
        console.log("Dropping old table ERP_REPORT_ENGG...");
        await pool.request().query("DROP TABLE IF EXISTS ERP_REPORT_ENGG");
        const createTableSql = `
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
                Batch VARCHAR(255),
                Year VARCHAR(50),
                Top_AIR VARCHAR(50),
                P1_P2 VARCHAR(50),
                Tot_720 VARCHAR(50),
                T_100 VARCHAR(50),
                T_200 VARCHAR(50),
                T_300 VARCHAR(50),
                T_400 VARCHAR(50),
                T_500 VARCHAR(50),
                T_600 VARCHAR(50)
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `;
        await pool.request().query(createTableSql);
        console.log("✅ Table 'ERP_REPORT_ENGG' recreated with correct count columns.");
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}
run();
