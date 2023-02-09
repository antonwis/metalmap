import pool from "../../../db/index";

export default defineEventHandler(async (event) => {
   
    const params = getQuery(event);
    let query = `SELECT * FROM bands`;
    if(params.genre || params.status) query += ` WHERE`;
    if(params.genre) query += ` genre LIKE '%${params.genre}%'`;
    if(params.status) query += ` AND status LIKE '%${params.status}%'`
    console.log("String: " + query)


    let connection;
    try {
        connection = await pool.getConnection();
        console.log("mariadb connection pool success");
        const rows = await connection.query(query);
        //delete rows.meta;
        return rows;

    } catch (e) {
        console.log("Error: " + e);
    } finally {
        connection?.release();
        console.log("connection released")
    }
    
});