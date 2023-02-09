import pool from "../../../../db/index";

export default defineEventHandler(async (event) => {
   
    if(event.context.params) {
    const { genre } = event.context.params;
    let connection;
    try {
        connection = await pool.getConnection();
        console.log("mariadb connection pool success");
        const rows = await connection.query(`SELECT * FROM bands WHERE genre LIKE '%${genre}%'`);
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