import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Page404 from "../common/page404";

function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default PublicPages;
