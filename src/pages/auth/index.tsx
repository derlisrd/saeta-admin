import { Route, Routes } from "react-router-dom";
import Home from "./home";

function AutenticatedPages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AutenticatedPages;
