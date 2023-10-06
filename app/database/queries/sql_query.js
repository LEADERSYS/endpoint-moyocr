const get_Sucursales = (idUsuario) => `
        select C.*
        FROM ls_Usu U
        JOIN ls_AcE A ON A.AcE_PAc = U.Usu_PAc
        JOIN ls_Cia C ON C.Cia_Id = A.AcE_Cia
        WHERE U.Usu_Id = '${idUsuario}' AND C.Cia_Tablet = 1;
`;

const get_Cupones = "SELECT * FROM ls_cupdes";

const get_Categorias_Articulos = "SELECT * FROM ls_cat";

const get_Articulos = "SELECT * FROM ls_art";

const get_Formas_Pago = "SELECT * FROM ls_fopa WHERE FoPa_Act = 1";

const get_Usuario = "SELECT Usu_Id, Usu_Pwd FROM ls_usu WHERE Usu_Id = ";

const get_ExoTipoDocumento = "SELECT id, nombre, codigo_hacienda, estado FROM exoneracion_tipo_documento";

const get_Tax = "SELECT Tax_Id, Tax_Nom, Tax_Por, Tax_Def, Tax_OC FROM ls_tax";

const get_HistorialTickets = (fecha) => `SELECT VMa_Fol, VMa_Fec, VMa_Sub, VMa_Tot, VMa_Sta FROM ls_vma WHERE DATE(VMa_Fec) = '${fecha}'`;

const get_Corte_FoPa = (idCia, idCaja, fecha) => `
        SELECT
        Cia_Nom,
        VFoPa_Id,
        FoPa_Nom,
        SUM(VFoPa_Imp) AS VFoPa_Imp
    FROM
        ls_VFoPa
        INNER JOIN ls_VMa VMA ON VMa_Cia = VFoPa_Cia
        AND VMa_Suc = VFoPa_Suc
        AND VMa_Fol = VFoPa_Fol
        INNER JOIN ls_FoPa ON FoPa_Id = VFoPa_Id
        INNER JOIN ls_Cia ON Cia_Id = VMa_Cia
        AND Cia_Suc = VMa_Suc
    WHERE
        VMa_Cia = ${idCia}
        AND VMa_Suc = ${idCaja}
        AND VMa_Sta = 1
        AND CONCAT (
            SUBSTRING(VMa_Fec, 9, 2),
            '/',
            SUBSTRING(VMa_Fec, 6, 2),
            '/',
            SUBSTRING(VMa_Fec, 1, 4)
        ) = '${fecha}'
    GROUP BY
        Cia_Nom,
        Cia_Suc,
        Cia_RaSo,
        Cia_RFC,
        CONCAT (
            SUBSTRING(VMa_Fec, 9, 2),
            '/',
            SUBSTRING(VMa_Fec, 6, 2),
            '/',
            SUBSTRING(VMa_Fec, 1, 4)
        ),
        VFoPa_Id,
        FoPa_Nom;
        `;

const get_Corte_TotalVendido = (idCia, idCaja, fecha) => `
    SELECT COALESCE(SUM(VFoPa_Imp),0) AS Total_VFoPa_Imp 
    FROM ls_VFoPa 
    INNER JOIN ls_VMa ON VMa_Cia = VFoPa_Cia AND VMa_Suc = VFoPa_Suc AND VMa_Fol = VFoPa_Fol 
    INNER JOIN ls_FoPa ON FoPa_Id = VFoPa_Id 
    INNER JOIN ls_Cia ON Cia_Id = VMa_Cia AND Cia_Suc = VMa_Suc 
    WHERE VMa_Cia = ${idCia} AND VMa_Suc = ${idCaja} AND VMa_Sta = 1 AND CONCAT(SUBSTRING(VMa_Fec, 9, 2), '/', SUBSTRING(VMa_Fec, 6, 2), '/', SUBSTRING(VMa_Fec, 1, 4)) = '${fecha}'
`;

const get_Corte_FondoCaja = (idTienda) => `SELECT Par_Val FROM ls_Par WHERE Par_Cia = ${idTienda} AND Par_Id = '2020'`;

const get_Corte_Descuentos = (idCia, idCaja, fecha) =>`
        SELECT COALESCE(SUM(VDe_Des), 0) AS VDe_Des
        FROM ls_VDe 
        INNER JOIN ls_VMa ON VMa_Cia = VDe_Cia 
            AND VMa_Suc = VDe_Suc 
            AND VMa_Fol = VDe_Fol 
        WHERE VMa_Cia = ${idCia}
            AND VMa_Suc = ${idCaja}
            AND VMa_Sta = 1 
            AND CONCAT(SUBSTRING(VMa_Fec, 9, 2), '/', SUBSTRING(VMa_Fec, 6, 2), '/', SUBSTRING(VMa_Fec, 1, 4)) = '${fecha}'`;


const insert_Folios = (folCia, folSuc) => `
            INSERT INTO ls_fol (Fol_Cia, Fol_Suc, Fol_Id, Fol_Per, Fol_Val)
            VALUES (${folCia},${folSuc},'vMOS','UNICO',1),
                   (${folCia},${folSuc},'TDV','UNICO',1)
`;

//const insertFolios = "INSERT INTO ls_fol (Fol_Cia, Fol_Suc, Fol_Id, Fol_Per, Fol_Val) VALUES (? , ? ,'vMOS','UNICO',1)";


module.exports = {
    get_Sucursales, get_Cupones,
    get_Categorias_Articulos,
    get_Articulos, get_Formas_Pago,
    get_Usuario,
    get_ExoTipoDocumento,
    get_Tax, get_HistorialTickets,
    get_Corte_FoPa, get_Corte_TotalVendido, get_Corte_FondoCaja, get_Corte_Descuentos,
    insert_Folios
}

