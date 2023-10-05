const dbQuery = require('../database/execute_query/execute');

const getFolios = async(req, res) => {
    try {

        const query_TDV = "SELECT Fol_Val AS TDV FROM ls_fol WHERE Fol_Cia = "+ req.body.idSucursal +" AND Fol_Suc = "+ req.body.idCaja +" AND Fol_Id = 'fTDV';"
        const query_vMOS = "SELECT Fol_Val AS vMOS FROM ls_fol WHERE Fol_Cia = "+ req.body.idSucursal +" AND Fol_Suc = "+ req.body.idCaja +" AND Fol_Id = 'vMOS';"

        let folio_TDV = await dbQuery.query_execute(query_TDV);
        let folio_vMOS = await dbQuery.query_execute(query_vMOS);

        if (folio_vMOS == null || folio_TDV == null) {
            return res.status(404).json({
                status: 404,
                message: 'No se encontraron folios para la sucursal seleccionada',
                data: []
            });
        }

        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                TDV : folio_TDV[0].TDV,
                vMOS : folio_vMOS[0].vMOS
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

module.exports = getFolios;