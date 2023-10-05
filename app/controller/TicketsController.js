const dbQuery = require('../database/execute_query/execute');
const { get_HistorialTickets } = require('../database/queries/sql_query');

const getTickets = async (req, res) => {
    try {
        const fechaTicket = req.body.fecha;
        console.log('Fecha: ', fechaTicket);
        const query_Tickets = get_HistorialTickets(fechaTicket);
        let listTickets = await dbQuery.query_execute(query_Tickets);
        console.log('Resultado: ', listTickets);
        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                listTickets : listTickets
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

module.exports = getTickets;