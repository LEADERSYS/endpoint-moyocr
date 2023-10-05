const sql = require('mssql');
const db = require('../../config/db_config');

const pool = new sql.ConnectionPool(db.connectionConfig);

// OCUPAR SOLO PARA DESARROLLO LOCAL - MYSQL

/*async function query_execute(query) {
    try {
        const [rows] = await db.pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener los datos de la consulta');
        return [];
    }
}*/

async function query_execute(query) {
    let poolConnection;

    try {
        poolConnection = await pool.connect();
        const result = await poolConnection.query(query);

        if (result.recordset.length === 0) {
            return null;
        }

        const data = result.recordset;
        console.log("Execute query: ", data);
        return data;

    } catch (error) {
        console.error('Error al ejecutar la consulta [*** ', query, ' ***]: ', error);
        pool.close();
        throw error;
    } finally {
        //pool.close();
        if (poolConnection) {
            poolConnection.release();
        }
    }
};

module.exports = {
    query_execute
}