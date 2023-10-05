const dbQuery = require('../database/execute_query/execute');
const query = require('../database/queries/sql_query');
const { get_Sucursales } = require('../database/queries/sql_query');

const getGeneralInfo = async (req, res) => {
    try {      
        const sucursales = get_Sucursales(req.body.idUsuario);
        let suc = await dbQuery.query_execute(sucursales);
        let cup = await dbQuery.query_execute(query.get_Cupones);
        let cat_art = await dbQuery.query_execute(query.get_Categorias_Articulos);
        let art = await dbQuery.query_execute(query.get_Articulos);
        let fopa = await dbQuery.query_execute(query.get_Formas_Pago);
        let tax = await dbQuery.query_execute(query.get_Tax);
        let exoneraciontipodocumento = await dbQuery.query_execute(query.get_ExoTipoDocumento);

        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                ls_Cia: suc,
                ls_Cupdes: cup,
                ls_Cat: cat_art,
                ls_Art: art,
                ls_Fopa: fopa,
                ls_Tax: tax,
                exotd: exoneraciontipodocumento
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Ha ocurrido un error",
            data: error
        });
    }
}

module.exports = getGeneralInfo;