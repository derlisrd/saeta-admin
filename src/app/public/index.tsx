import { Route, Routes } from "react-router-dom";;
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

function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

const Login = Loadable(lazy(() => import("./login")));
const Recuperar = Loadable(lazy(() => import("./recuperar")));

export default PublicPages;
