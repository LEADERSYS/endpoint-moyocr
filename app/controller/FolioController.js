const dbQuery = require('../database/execute_query/execute');
const { insert_Folios } = require('../database/queries/sql_query');

const getFolios = async(req, res) => {
    try {
        
        const query_TDV = "SELECT Fol_Val AS TDV FROM ls_fol WHERE Fol_Cia = "+ req.body.idSucursal +" AND Fol_Suc = "+ req.body.idCaja +" AND Fol_Id = 'TDV';"
        const query_vMOS = "SELECT Fol_Val AS vMOS FROM ls_fol WHERE Fol_Cia = "+ req.body.idSucursal +" AND Fol_Suc = "+ req.body.idCaja +" AND Fol_Id = 'vMOS';"

        let folio_TDV = await dbQuery.query_execute(query_TDV);
        let folio_vMOS = await dbQuery.query_execute(query_vMOS);

        if (folio_vMOS == null || folio_TDV == null) {
            const foliosInsertados = insert_Folios(req.body.idSucursal, req.body.idCaja);
            let resultInsert = await dbQuery.query_execute_insert(foliosInsertados);
            
            if(resultInsert) {
                res.status(200).json({
                    status: 200,
                    message: "Success",
                    data: {
                        TDV : 1,
                        vMOS : 1
                    } 
                });
            } else {
                res.status(500).json({
                    status: 500,
                    message: "Error al insertar los nuevos folios de la sucursal",
                    data: []
                });
            } 
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
        console.log(error);
        res.status(500).json({
            status: 500,
            message: "Ha ocurrido un error",
            data: error
        });
    }
}

module.exports = getFolios;