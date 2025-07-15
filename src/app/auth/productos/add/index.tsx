import Notificacion from "./containers/noti";
import AddProductoMain from "./main";
import AddCategoriaModal from "./modals/addCategoria";
import AddProductoProvider from "./provider";

function AddProducto() {
  return (
    <AddProductoProvider>
      <Notificacion />
      <AddCategoriaModal />
      <AddProductoMain />
    </AddProductoProvider>
  );
}

export default AddProducto;
