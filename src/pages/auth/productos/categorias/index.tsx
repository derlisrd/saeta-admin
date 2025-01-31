import CategoriaList from "./list";
import AddModal from "./modals/add";
import CategoriasProvider from "./provider";

function Categorias() {
  return (
    <CategoriasProvider>
      <AddModal />
      <CategoriaList />
    </CategoriasProvider>
  );
}

export default Categorias;
