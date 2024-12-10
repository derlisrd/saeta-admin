import { Route, Routes } from "react-router-dom";
import AuthMenuLayout from "@/layout/AuthMenuLayout";
import { Suspense, lazy, LazyExoticComponent } from "react";
import LoadingPage from "@/core/components/ui/loading";

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
    <Routes>
      <Route path="/" element={<AuthMenuLayout />}>
        <Route index element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

const Home = Loadable(lazy(() => import("./home")));
const Page404 = Loadable(lazy(() => import("../common/page404")));
const Clientes = Loadable(lazy(() => import("./clientes")));

export default AutenticatedPages;
