import AddFormasPagoModal from "./_modals/add";
import FormasPagoList from "./list";
import { FormasPagoProvider } from "./provider";


function FormasPago() {
  return <FormasPagoProvider>
    <AddFormasPagoModal />
    <FormasPagoList />
  </FormasPagoProvider>
}

export default FormasPago;
