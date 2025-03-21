import useListaPedidos from "@/core/hooks/ventas/pedidos/useListaPedidos";
import { Container } from "@mui/material";

function ListaPedidos() {
  const { lista } = useListaPedidos();
  return (
    <Container>
      <h3>Lista de pedidos</h3>
    </Container>
  );
}

export default ListaPedidos;
