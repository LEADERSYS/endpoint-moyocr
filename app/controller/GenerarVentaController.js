const dbQuery = require('../database/execute_query/execute');

const generarVenta = async(req, res) => {
    try {    
        console.log("Body: ", req.body);


        
        /**********************************************************TABLE : ls_fol *************************************************************************/
        let sql_ls_vfol;
        const query_vMOS = "SELECT Fol_Val as vMOS FROM ls_fol WHERE Fol_Cia =" + req.body[0].ls_vfol[0].Fol_Cia + " and Fol_Id = 'vMOS'";
        let folio_vMOS = await dbQuery.query_execute(query_vMOS);
        let existeFolioVMOS = false;
        if(folio_vMOS.length !== 0) { existeFolioVMOS = true; }
        for(const vde of req.body[0].ls_vfol) {
            if(existeFolioVMOS) {
                const updatedD = `UPDATE ls_fol SET Fol_Val = ${vde.Fol_Val} WHERE  Fol_Cia =  ${vde.Fol_Cia} AND Fol_Id = '${vde.Fol_Id}'`;
                sql_ls_vfol = await dbQuery.query_execute(updatedD);
            } else {
                const queryD = `INSERT INTO ls_fol(Fol_Cia, Fol_Suc, Fol_Id, Fol_Val)  
                VALUES (${vde.Fol_Cia}, ${vde.Fol_Suc}, '${vde.Fol_Id}', ${vde.Fol_Val})`;
                sql_ls_vfol = await dbQuery.query_execute(queryD);
            }
        }

        /**********************************************************TABLE : ls_vde *************************************************************************/
        let sql_ls_vde;
        for(const vde of req.body[0].ls_vde) {
            const queryA = `INSERT INTO ls_vde (VDe_Cia, VDe_Suc, VDe_Mov, VDe_Fol, VDe_Ren, VDe_Art, VDe_Can, VDe_Pre, 
                VDe_TaxId, VDe_TaxPor, VDe_Des, VDe_Sub, VDe_TaxIni, VDe_TaxExon, VDe_Tax, VDe_Net) 
                VALUES (${vde.VDe_Cia}, ${vde.VDe_Suc}, ${vde.VDe_Mov}, ${vde.VDe_Fol}, ${vde.VDe_Ren}, 
                ${vde.VDe_Art}, ${vde.VDe_Can}, ${vde.VDe_Pre}, ${vde.VDe_TaxId}, ${vde.VDe_TaxPor}, ${vde.VDe_Des}, 
                ${vde.VDe_Sub}, ${vde.VDe_TaxIni}, ${vde.VDe_TaxExon}, ${vde.VDe_Tax}, ${vde.VDe_Net})`;
                sql_ls_vde = await dbQuery.query_execute(queryA);
        }

        /**********************************************************TABLE : ls_vcup *************************************************************************/

        if(req.body[0].ls_vcup[0].vcup_id !== 0) {
            let sql_ls_vcup;
            for(const vde of req.body[0].ls_vcup) {
                const queryB= `INSERT INTO ls_vcup (VCup_Cia, vcup_suc, vcup_id, vcup_fol, vcup_tick, vcup_por) 
                    VALUES (${vde.VCup_Cia}, ${vde.vcup_suc}, ${vde.vcup_id}, ${vde.vcup_fol}, ${vde.vcup_tick}, 
                    ${vde.vcup_por})`;
                    sql_ls_vcup = await dbQuery.query_execute(queryB);
            }
        }

        /**********************************************************TABLE : ls_vfopa *************************************************************************/

        let sql_ls_vfopa;
        for(const vde of req.body[0].ls_vfopa) {
            vde.VFoPa_Fol = vde.VFoPa_Fol + 1;
            const queryC = `INSERT INTO ls_vfopa (VFoPa_Cia, VFoPa_Suc, VFoPa_Fol, VFoPa_Id, VFoPa_Imp)  
                VALUES (${vde.VFoPa_Cia}, ${vde.VFoPa_Suc}, ${vde.VFoPa_Fol}, ${vde.VDeVFoPa_Id_Fol}, ${vde.VFoPa_Imp})`;
                sql_ls_vfopa = await dbQuery.query_execute(queryC);
        }

        /**********************************************************TABLE : ls_vma *************************************************************************/

        let sql_ls_vma;
        for(const vde of req.body[0].ls_vma) {
            const queryA = `INSERT INTO ls_vma (VMa_Cia, VMa_Suc, VMa_Mov, VMa_Fol, VMa_Fec, VMa_Cte, VMa_Sub, VMa_TaxIni, VMa_TaxExon, VMa_Tax, VMa_Tot, VMa_Efe, VMa_Camb, VMa_Sta, VMa_Usu, VMa_TipPed, VMa_Sinc) 
                VALUES (${vde.VMa_Cia}, ${vde.VMa_Suc}, ${vde.VMa_Mov}, ${vde.VMa_Fol}, '${vde.VMa_Fec}', ${vde.VMa_Cte}, ${vde.VMa_Sub}, ${vde.VMa_TaxIni}, ${vde.VMa_TaxExon}, ${vde.VMa_Tax}, ${vde.VMa_Tot}, 
                ${vde.VMa_Efe}, ${vde.VMa_Camb}, ${vde.VMa_Sta}, '${vde.VMa_Usu}', ${vde.VMa_TipPed}, ${vde.VMa_Sinc})`;
                sql_ls_vma = await dbQuery.query_execute(queryA);
        }

        /**********************************************************TABLE : venta_exoneracion *************************************************************************/

        if(req.body[0].venta_exoneracion[0].tipo_documento !== 0) {
            let sql_venta_exoneracion;
            for(const vde of req.body[0].venta_exoneracion) {
                vde.folio = vde.folio + 1;
                const queryF = `INSERT INTO venta_exoneracion (negocio, caja, folio, tipo_documento, numero_documento, nombre_institucion, fecha_emision, porcentaje) 
                    VALUES (${vde.negocio}, ${vde.caja}, ${vde.folio}, ${vde.tipo_documento}, ${vde.numero_documento}, '${vde.nombre_institucion}', ${vde.fecha_emision}, ${vde.porcentaje})`;
                sql_venta_exoneracion = await dbQuery.query_execute(queryF);
            }
        }

        /********************************************************** VALIDACION *************************************************************************/

        if(sql_ls_vde.length === 0 || sql_ls_vcup.length === 0 || sql_ls_vfopa.length === 0 || sql_ls_vfol.length === 0 || sql_ls_vma.length === 0 || sql_venta_exoneracion === 0) {
            res.status(500).json({
                status: 500,
                message: "Error al guardar la informacion en la Base de datos. Ponte en contacto con tu administrador",
                data: []
            });
        }

        const sql_vmos = "SELECT Fol_Val as vMOS FROM ls_fol WHERE Fol_Cia =" + req.body[0].ls_vfol[0].Fol_Cia + " and Fol_Id = 'vMOS'";
        let obtener_folio_registrado = await dbQuery.query_execute(sql_vmos);
        if(obtener_folio_registrado.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Error al obtener el folio de la ultima venta generada",
                data: []
            });
        }

        res.status(200).json({
            status: 200,
            message: "Success",
            data: obtener_folio_registrado
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Ha ocurrido un error",
            data: error
        });
    }
}

module.exports = generarVenta;