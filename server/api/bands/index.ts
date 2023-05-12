import pool from "../../../db/index";

export default defineEventHandler(async (event) => {
   
    const params = getQuery(event);
    let query = `SELECT * FROM bands`;
    if(params.genre || params.status || params.name) query += ` WHERE `;
    if(params.name) query += `name LIKE '%${params.name}%'`;
    if(params.name && params.genre) query += ` AND `;
    if(params.genre) query += `genre LIKE '%${params.genre}%'`;
    if(params.name && params.genre && params.status) query += ` AND `;
    if(params.status) query += `status LIKE '%${params.status}%'`
    console.log("Query String: " + query)

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