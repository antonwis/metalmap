import mariadb from "mariadb";
const config = useRuntimeConfig();

const pool = mariadb.createPool({
    socketPath: config.dbSocket,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabaseName,
    connectionLimit: 5
})

export default pool;