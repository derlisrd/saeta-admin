import { Grid, TextField, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import useAddProducto from "../_hook/useAddProducto";

function Comision() {
    const { form, changeByName } = useAddProducto()
    return (
        <>
            <Grid size={12}>
                <Typography variant="button" fontWeight="bold">
                    COMISIÓN
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <NumericFormat
                    allowNegative={false}
                    customInput={TextField}
                    suffix="%"
                    thousandSeparator="."
                    decimalSeparator=","
                    placeholder="Si tiene comisión"
                    isAllowed={({ floatValue }) => floatValue !== undefined && floatValue < 100}
                    value={form.porcentaje_comision}
                    valueIsNumericString
                    onValueChange={(e) => {
                        changeByName("porcentaje_comision", Number(e.value));
                    }}
                    fullWidth
                    label="Completa si tiene comisión"
                    helperText="% de comision"
                /* error={error.code === 8} */
                />
            </Grid>
        </>
    );
}

export default Comision;