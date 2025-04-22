import { apiServiceAuth } from "./auth/auth";
import { apiServiceClientes } from "./clientes/clientes";
import { apiSErviceConfig } from "./empresa/config";
import { apiServiceFormasPago } from "./factura/formaspago";
import { apiServiceImpuestos } from "./factura/impuesto";
import { apiServiceMonedas } from "./factura/monedas";
import { apiServicePedidos } from "./pedidos/pedidos";
import { apiServiceCategorias } from "./productos/categoria";
import { apiServiceDepositos } from "./productos/deposito";
import { apiServiceMedidas } from "./productos/medidas";
import { apiServiceProductos } from "./productos/producto";
import { apiServiceStock } from "./productos/stock";

const API = {
    auth : apiServiceAuth,
    clientes: apiServiceClientes,
    productos: apiServiceProductos,
    stock : apiServiceStock,
    pedidos: apiServicePedidos,
    categorias: apiServiceCategorias,
    impuestos: apiServiceImpuestos,
    formasPago: apiServiceFormasPago,
    monedas: apiServiceMonedas,
    depositos: apiServiceDepositos,
    medidas: apiServiceMedidas,
    config: apiSErviceConfig 
}

export default API