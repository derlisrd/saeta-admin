
import ListaPedidosMain from "./main";
import { ListaPedidosProvider } from "./provider";



function ListaPedidos() {

  return (
    <ListaPedidosProvider>
      <ListaPedidosMain />
    </ListaPedidosProvider>
  );
}

export default ListaPedidos;
