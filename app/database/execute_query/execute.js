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
        console.log("Query: ", query);
        poolConnection = await pool.connect();
        const result = await poolConnection.query(query);
        console.log("ResultadoConsulta: ", result);
        if (result.recordset.length === 0) {
            return null;
        }

        const data = result.recordset;
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

async function query_execute_insert(query) {
    let poolConnection;

    try {
        console.log("Query: ", query);
        poolConnection = await pool.connect();
        const result = await poolConnection.query(query);
        if (result.rowsAffected.length === 0) {
            return false;
        }
        return true;

    } catch (error) {
        console.error('Error al ejecutar la consulta [*** ', query, ' ***]: ', error);
        pool.close();
    } finally {
        //pool.close();
        if (poolConnection) {
            poolConnection.release();
        }
    }
};

module.exports = {
    query_execute, 
    query_execute_insert
}