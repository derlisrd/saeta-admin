import { Grid, TextField, Typography } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";
import { NumericFormat } from "react-number-format";

function Stock() {
    const { depositoActivo, form, changeByName, error } = useAddProducto();
    return <>
        <Grid size={12}>
            <Typography variant="button">STOCK</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
            <NumericFormat
                autoComplete="off"
                customInput={TextField}
                thousandSeparator="."
                decimalSeparator=","
                placeholder="Cantidad"
                name="cantidad"
                value={form.stock}
                onValueChange={(e) => {
                    changeByName("stock", Number(e.value));
                }}
                fullWidth
                label="Cantidad"
                error={error.code === 9}
            />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="button">Deposito Activo: {depositoActivo.nombre}</Typography>
        </Grid>
    </>
}

export default Stock;