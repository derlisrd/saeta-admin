
import OptionsProvider from "./provider";
import MainOptions from "./main";
import Notificacion from "./containers/noti";


function InfoTienda() {

    return <OptionsProvider>
        <Notificacion />
        <MainOptions />
    </OptionsProvider>
}

export default InfoTienda;