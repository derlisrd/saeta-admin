import AddProductoMain from "./main";
import AddCategoriaModal from "./modals/addCategoria";
import AddProductoProvider from "./provider";

function AddProducto() {
  return (
    <AddProductoProvider>
      <AddCategoriaModal />
      <AddProductoMain />
    </AddProductoProvider>
  );
}

export default AddProducto;
