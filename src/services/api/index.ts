import { apiServiceAuth } from "./auth/auth";
import { apiSErviceConfig } from "./empresa/config";
import { apiServiceFormasPago } from "./factura/formaspago";
import { apiServiceImpuestos } from "./factura/impuesto";
import { apiServiceCategorias } from "./productos/categoria";
import { apiServiceDepositos } from "./productos/deposito";
import { apiServiceMedidas } from "./productos/medidas";
import { apiServiceProductos } from "./productos/producto";

const API = {
    auth : apiServiceAuth,
    productos: apiServiceProductos,
    categorias: apiServiceCategorias,
    impuestos: apiServiceImpuestos,
    formasPago: apiServiceFormasPago,
    depositos: apiServiceDepositos,
    medidas: apiServiceMedidas,
    config: apiSErviceConfig 
}

export default API