import ClientesModal from "./_modals/clientes";
import FinalizarPedido from "./_modals/finalizar";
import Main from "./main";
import AddPedidoProvider from "./provider";

function AddPedido() {
  return (
    <AddPedidoProvider>
      <ClientesModal />
      <FinalizarPedido />
      <Main />
    </AddPedidoProvider>
  );
}

export default AddPedido;
