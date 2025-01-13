import Main from "./main";
import AddPedidoProvider from "./provider";

function AddPedido() {
  return (
    <AddPedidoProvider>
      <Main />
    </AddPedidoProvider>
  );
}

export default AddPedido;
