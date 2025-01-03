import { Route, Routes } from "react-router-dom";
import Login from "./login";

function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default PublicPages;
