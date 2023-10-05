//const mysql = require('mysql2');
const mssql = require('mssql');

// Configura los detalles de la conexión
/*const connectionConfig = mysql.createPool({
    user: 'usermoyocr',
    password: 'Usermoyo1',
    host: 'localhost',
    database: 'lsdb',
});*/

 
    const connectionConfig = {
        user: 'Administrador',
        password: 'Daniela2oo3',
        server: 'nro1dka6km.database.windows.net',
        database: 'LSDB',
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    };

//const pool = connection.promise();
const pool = new mssql.ConnectionPool(connectionConfig);

async function connectToDatabase() {
    try {
        await pool.connect();
        console.log('Conexión exitosa a la base de datos de MoyoCR');
    } catch (error) {
        console.error('Error al conectar a la base de datos de MoyoCR:', error);
    }
};

module.exports = {
    pool,
    connectionConfig,
    connectToDatabase
};
