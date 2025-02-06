import modals from "./modals";
import Main from "./main";
import AddPedidoProvider from "./provider";
import Root from "./root";

function AddPedido() {
  return (
    <AddPedidoProvider>
      {modals.map((Modal, index) => (
        <Modal key={index} />
      ))}
      <Main />
      <Root />
    </AddPedidoProvider>
  );
}

export default AddPedido;
