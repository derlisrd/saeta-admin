import ListaDepositos from "./lista";
import { DepositosProvider } from "./provider";

function Depositos() {
    return <DepositosProvider>
        <ListaDepositos />
    </DepositosProvider>
}

export default Depositos;