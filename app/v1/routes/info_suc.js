const express = require('express');
const infoBranchRouter = express.Router();
const getGeneralInfo = require('../../controller/get_info_suc');
const validate_token = require('../../middleawares/AuthMiddleware');
const getFolios = require('../../controller/FolioController');
const get_CorteTienda = require('../../controller/CorteController');
const generarVenta = require('../../controller/GenerarVentaController');
const getTickets = require('../../controller/TicketsController');

infoBranchRouter.post('/info', validate_token, getGeneralInfo);
infoBranchRouter.post('/folio', validate_token,getFolios);
infoBranchRouter.post('/corte', validate_token, get_CorteTienda);
infoBranchRouter.post('/generarventa', validate_token, generarVenta);
infoBranchRouter.post('/tickets', validate_token, getTickets);

module.exports = infoBranchRouter;

