import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useProductosLista } from "../provider";

function DepositoSelect() {
    const { depositos, selectDeposito, setSelectDeposito, changeSelectDeposito } = useProductosLista();
    return (
        <FormControl fullWidth>
            <InputLabel id="deposito-select-label">Seleccione depósito</InputLabel>
            <Select value={selectDeposito} onChange={({ target }) => {
                setSelectDeposito(Number(target.value));
                changeSelectDeposito(Number(target.value), "");
            }} label="Depósito">
                <MenuItem value={0} disabled>
                    Seleccione un deposito
                </MenuItem>
                {depositos.map((deposito) => (
                    <MenuItem key={deposito.id} value={deposito.id}>
                        {deposito.nombre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default DepositoSelect;