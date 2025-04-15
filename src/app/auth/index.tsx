import { Route, Routes } from "react-router-dom";
import AuthMenuLayout from "@/layout/AuthMenuLayout";
import { Suspense, lazy, LazyExoticComponent } from "react";
import LoadingPage from "@/core/components/ui/loading";
import LogOut from "./logout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Loadable =
  <T extends object>(Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: T) => {
    return (
      <Suspense fallback={<LoadingPage />}>
        <Component {...props} />
      </Suspense>
    );
  };

function AutenticatedPages() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<AuthMenuLayout />}>
          <Route index element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/add" element={<ClientesAdd />} />
          <Route path="/productos/lista" element={<ProductosLista />} />
          <Route path="/config/tema" element={<Tema />} />
          <Route path="/config/empresa" element={<ConfigEmpresa />} />
          <Route path="/config/parametros" element={<Parametros />} />

          <Route path="/productos/add" element={<ProductosAdd />} />
          <Route path="/productos/carga-stock" element={<ProductosCargaStock />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas/pedidos/add" element={<PedidosAdd />} />
          <Route path="/ventas/pedidos/lista" element={<PedidosLista />} />

          <Route path="/logout" element={<LogOut />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </LocalizationProvider>
  );
}

const Parametros = Loadable(lazy(() => import("./config/parametros")));
const Categorias = Loadable(lazy(() => import("./productos/categorias")));
const Home = Loadable(lazy(() => import("./home")));
const Page404 = Loadable(lazy(() => import("../common/page404")));
const Clientes = Loadable(lazy(() => import("./clientes")));
const ClientesAdd = Loadable(lazy(() => import("./clientes/add")));
const ConfigEmpresa = Loadable(lazy(() => import("./config/empresa")));
const Tema = Loadable(lazy(() => import("./config/tema")));
const ProductosLista = Loadable(lazy(() => import("./productos/list")));
const PedidosLista = Loadable(lazy(() => import("./ventas/pedidos/lista")));
const ProductosAdd = Loadable(lazy(() => import("./productos/add")));
const ProductosCargaStock = Loadable(lazy(() => import("./productos/carga-stock")));

const PedidosAdd = Loadable(lazy(() => import("./ventas/pedidos/add")));

export default AutenticatedPages;
