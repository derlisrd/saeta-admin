import MainListaCreditos from "./main"
import { ListaCreditosProvider } from "./provider"

function ListaCreditos() {
    return <ListaCreditosProvider>
        <MainListaCreditos />
    </ListaCreditosProvider>
}

export default ListaCreditos