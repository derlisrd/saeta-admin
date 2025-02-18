import { Container } from "@mui/material";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: "center" }}>No encontrado</h1>
      <Link to="/">Volver</Link>
    </Container>
  );
}

export default Page404;
