
import EditProductoMain from "./main";
import { EditProductoProvider } from "./provider";

function EditProducto() {


  return <EditProductoProvider>
    <EditProductoMain />
  </EditProductoProvider>
}

export default EditProducto