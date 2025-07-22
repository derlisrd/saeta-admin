import { Grid, TextField, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import useAddProducto from "../_hook/useAddProducto";

function Comision() {
    const { form } = useAddProducto()
    return (
        <>
            <Grid size={12}>
                <Typography variant="button" fontWeight="bold">
                    COMISIÓN
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <NumericFormat
                    customInput={TextField}
                    thousandSeparator="."
                    decimalSeparator=","
                    placeholder="Precio promocional"
                    name="precio_descuento"
                    value={0}
                    onValueChange={(e) => {
                        //changeByName("precio_descuento", Number(e.value));
                    }}
                    fullWidth
                    label="Si tiene promoción"
                    helperText="Precio con promoción"
                /* error={error.code === 8} */
                />
            </Grid>
        </>
    );
}

export default Comision;