import pool from "../../../../db/index";

export default defineEventHandler(async (event) => {
   
    if(event.context.params) {
    const { country } = event.context.params;
    let connection;
    try {
        connection = await pool.getConnection();
        console.log("mariadb connection pool success");
        const rows = await connection.query(`SELECT * FROM bands WHERE country LIKE '%${country}%'`);
        console.log(rows);
        //delete rows.meta;
        return rows;

    } catch (e) {
        console.log("Error: " + e);
    } finally {
        connection?.release();
        console.log("connection released")
    }
    }
});