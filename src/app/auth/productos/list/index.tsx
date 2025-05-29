import PrintCodigoModal from "./_modal/codigo";
import ListaProductosMain from "./main";
import { ProductosListaProvider } from "./provider";

function ProductosList() {
    return <ProductosListaProvider>
        <ListaProductosMain />
        <PrintCodigoModal />
    </ProductosListaProvider>
}

export default ProductosList;