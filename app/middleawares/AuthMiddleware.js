const jwt = require('jsonwebtoken');
const dbQuery = require('../database/execute_query/execute');

// Middleware de autenticación
const validate_token = async (req, res, next) =>{
  try {
    const authorizationHeader = req.headers.authorization;
    
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
    
    if(!accessToken){
      return res.status(200).json({
        status: 401,
        message: 'Token de autenticación no proporcionado',
      });
    }
    
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    const sql_query = "SELECT CASE WHEN EXISTS (SELECT 1 FROM ls_usu WHERE Usu_Id = '"+ decodedToken.id +"') THEN 1 ELSE 0 END AS existe_usuario;";

    let info_user = await dbQuery.query_execute(sql_query);
    console.info("Info_User: ", info_user);

    if(!info_user[0].existe_usuario) {
      return res.status(200).json({
        status: 403,
        message: 'Autenticación inválida'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
        status: 500,
        message: 'Error al autenticarse con el servicio'
    });
  }  
};

module.exports = validate_token;