const dbQuery = require('../database/execute_query/execute');
const { get_Corte_FoPa, get_Corte_TotalVendido, get_Corte_FondoCaja, get_Corte_Descuentos } =  require('../database/queries/sql_query');
const get_CorteTienda = async(req, res) => {
    try {
        const id_cia = req.body.idTienda;
        const id_caja = req.body.idCaja;
        const fecha_corte = req.body.fecha;

        //formas pago
        let corte_fopa;
        try {
            const query_FoPa = get_Corte_FoPa(id_cia,id_caja,fecha_corte);
            corte_fopa = await dbQuery.query_execute(query_FoPa);
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Success",
                data: error
            });
        }

        //total vendido = Suma total formas pago
        let corte_totalvendido;
        try {
            const query_TotalVendido  = get_Corte_TotalVendido(id_cia,id_caja,fecha_corte);
            corte_totalvendido = await dbQuery.query_execute(query_TotalVendido);
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Success",
                data: error
            });
        }

        // fondo caja
        let corte_fondocaja;
        try {
            const query_Fondocaja = get_Corte_FondoCaja(id_cia);
            corte_fondocaja = await dbQuery.query_execute(query_Fondocaja);
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Error",
                data: error
            });
        }

        // total en caja = TOTAL VENDIDO + FONDO EN CAJA
        let total_encaja = 0;
        try {
            total_encaja = corte_totalvendido.reduce((total, item) => total + parseFloat(item.Total_VFoPa_Imp), 0) + parseFloat(corte_fondocaja[0].Par_Val.replace(',', ''));
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Success",
                data: error
            });            
        }

        // Descuentos
        let corte_descuentos;
        try {
            const query_Descuentos = get_Corte_Descuentos(id_cia,id_caja,fecha_corte);
            corte_descuentos = await dbQuery.query_execute(query_Descuentos);
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Success",
                data: error
            });
        }

        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                corte_fopa : corte_fopa,
                corte_totalvendido : parseFloat(corte_totalvendido[0].Total_VFoPa_Imp),
                corte_fondocaja : parseFloat(corte_fondocaja[0].Par_Val.replace(/,/g, '')),
                corte_totalencaja : total_encaja,
                corte_descuentos : parseFloat(corte_descuentos[0].VDe_Des)
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

module.exports = get_CorteTienda;