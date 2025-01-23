import AddProductoMain from "./main";
import AddProductoProvider from "./provider";

function AddProducto() {
  return (
    <AddProductoProvider>
      <AddProductoMain />
    </AddProductoProvider>
  );
}

export default AddProducto;
