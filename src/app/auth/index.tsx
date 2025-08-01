import { Route, Routes } from "react-router-dom";
import AuthMenuLayout from "@/layout/AuthMenuLayout";
import { Suspense, lazy, LazyExoticComponent } from "react";
//import LoadingPage from "@/core/components/ui/loading";
import LogOut from "./logout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");
import LoadingScreen from "@/components/ui/loading";

const Loadable =
  <T extends object>(Component: LazyExoticComponent<() => JSX.Element>) =>
    (props: T) => {
      return (
        <Suspense fallback={<LoadingScreen />}>
          <Component {...props} />
        </Suspense>
      );
    };

function AutenticatedPages() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}
      adapterLocale="es"
    >
      <Routes>
        <Route path="/" element={<AuthMenuLayout />}>
          <Route index element={<Home />} />

          <Route path="/estadisticas/producto" element={<EstadisticasProducto />} />
          <Route path="/estadisticas/general" element={<EstadisticasGeneral />} />

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/add" element={<ClientesAdd />} />
          <Route path="/productos/lista" element={<ProductosLista />} />
          <Route path="/config/empresa" element={<ConfigEmpresa />} />
          <Route path="/config/parametros" element={<Parametros />} />
          <Route path="/config/impresoras" element={<Impresoras />} />
          <Route path="/config/users" element={<Users />} />
          <Route path="/config/users/add" element={<UserAdd />} />
          <Route path="/config/formas-pago" element={<FormasPago />} />
          <Route path="/config/depositos" element={<Deposito />} />

          <Route path="/productos/add" element={<ProductosAdd />} />

          <Route path="/productos/edit/:id" element={<ProductosEdit />} />
          <Route path="/productos/details/:id" element={<ProductosDetails />} />
          <Route path="/productos/carga-stock" element={<ProductosCargaStock />} />
          <Route path="/productos/codigo-barra" element={<PrintCodigoBarra />} />

          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas/facturacion" element={<Facturacion />} />
          <Route path="/ventas/pedidos/add" element={<PedidosAdd />} />
          <Route path="/ventas/pedidos/lista" element={<PedidosLista />} />

          <Route path="/ventas/creditos/lista" element={<CreditosLista />} />
          <Route path="/ventas/creditos/cobrar/:id" element={<CreditosCobrar />} />

          <Route path="/ventas/pedidos/devoluciones" element={<Devoluciones />} />
          <Route path="/actualizacion" element={<Actualizaciones />} />
          <Route path="/logout" element={<LogOut />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </LocalizationProvider>
  );
}
const Parametros = Loadable(lazy(() => import("./config/parametros")));
const Impresoras = Loadable(lazy(() => import("./config/impresoras")));
const Categorias = Loadable(lazy(() => import("./productos/categorias")));
const Home = Loadable(lazy(() => import("./home")));
const Page404 = Loadable(lazy(() => import("../common/page404")));
const Clientes = Loadable(lazy(() => import("./clientes/lista")));
const ClientesAdd = Loadable(lazy(() => import("./clientes/add")));
const ConfigEmpresa = Loadable(lazy(() => import("./config/empresa")));

const Deposito = Loadable(lazy(() => import("./config/depositos")));

const Users = Loadable(lazy(() => import("./config/users/list")));
const UserAdd = Loadable(lazy(() => import("./config/users/add")));
const CreditosLista = Loadable(lazy(() => import("./ventas/creditos/lista")));
const CreditosCobrar = Loadable(lazy(() => import("./ventas/creditos/cobrar")));
const FormasPago = Loadable(lazy(() => import("./config/formas-pago")));

const Facturacion = Loadable(lazy(() => import("./ventas/facturacion")));

const PedidosLista = Loadable(lazy(() => import("./ventas/pedidos/lista")));
const Devoluciones = Loadable(lazy(() => import("./ventas/pedidos/devoluciones")));
const PedidosAdd = Loadable(lazy(() => import("./ventas/pedidos/add")));

const PrintCodigoBarra = Loadable(lazy(() => import("./productos/print-codigo-barra")));
const ProductosLista = Loadable(lazy(() => import("./productos/list")));
const ProductosAdd = Loadable(lazy(() => import("./productos/add")));
const ProductosDetails = Loadable(lazy(() => import("./productos/details")));
const ProductosEdit = Loadable(lazy(() => import("./productos/edit")));
const ProductosCargaStock = Loadable(lazy(() => import("./productos/carga-stock")));

const Actualizaciones = Loadable(lazy(() => import('./actualizacion')));


const EstadisticasProducto = Loadable(lazy(() => import("./estadisticas/producto")));
const EstadisticasGeneral = Loadable(lazy(() => import("./estadisticas/general")));
export default AutenticatedPages;
