import { Route, Routes } from "react-router-dom";
import Home from "./home";
import AuthMenuLayout from "@/layout/AuthMenuLayout";
import Cliente from "./clientes";
import Page404 from "../common/page404";

function AutenticatedPages() {
  return (
    <Routes>
      <Route path="/" element={<AuthMenuLayout />}>
        <Route index element={<Home />} />
        <Route path="/clientes" element={<Cliente />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AutenticatedPages;
