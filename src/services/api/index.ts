import { apiServiceAuth } from "./auth/auth";
import { apiServiceClientes } from "./clientes/clientes";
import { apiServiceConfig } from "./empresa/config";
import { apiServiceSucursales } from "./empresa/sucursales";
import { apiServiceEstadisticas } from "./estadisticas/estadisticas";
import { apiServiceFormasPago } from "./config/formaspago";
import { apiServiceImpuestos } from "./factura/impuesto";
import { apiServiceMonedas } from "./factura/monedas";
import { apiServicePedidos } from "./pedidos/pedidos";
import { apiServiceCategorias } from "./productos/categoria";
import { apiServiceDepositos } from "./productos/deposito";
import { apiServiceMedidas } from "./productos/medidas";
import { apiServiceProductos } from "./productos/producto";
import { apiServiceStock } from "./productos/stock";
import { apiServiceUsers } from "./users/users";

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
    config: apiServiceConfig ,
    users: apiServiceUsers,
    estadisticas: apiServiceEstadisticas,
    sucursales: apiServiceSucursales
}

export default API