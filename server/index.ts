import { Nitro } from "nitropack";
import mariadb from "mariadb";

export default async (_nitroApp: Nitro) => {
    console.log("nitro plugin");
    const config = useRuntimeConfig();

    try {
        const connection = await mariadb.createConnection({
            socketPath: config.dbSocket,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabaseName,
        });
        console.log("mariadb connected");
        const rows = await connection.query("SELECT * FROM bands");
        delete rows.meta;
        console.log(rows);

    } catch (e) {
        console.log("Error: " + e);
    }

    



}