const jwt = require('jsonwebtoken');
const dbQuery = require('../database/execute_query/execute');
const query = require('../database/queries/sql_query');

const authLogin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const query_body = query.get_Usuario + "'" + username + "'"; 

        let info_user = await dbQuery.query_execute(query_body);

        if(info_user[0].length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Usuario no encontrado. Intentalo de nuevo.',
                data: []
            });
        } 

        if(password !== info_user[0].Usu_Pwd) {
            return res.status(404).json({
                status: 404,
                message: 'Contraseña incorrecta. Intentalo de nuevo.',
                data: []
            });
        }

        const userData = {
            id: info_user[0].Usu_Id
        };

        const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: [ token ]
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Ha ocurrido un error.',
            data: []
        });
    }
}

module.exports = authLogin;