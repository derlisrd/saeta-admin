import ClientesList from "./list";
import AddModal from "./modals/add";
import ClientesProvider from "./provider";

function Clientes() {
  return (
    <ClientesProvider>
      <AddModal />
      <ClientesList />
    </ClientesProvider>
  );
}

export default Clientes;
