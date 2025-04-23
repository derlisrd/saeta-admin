import { Button, Grid2 as Grid, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

function Reponer() {
  return (
    <Grid container columnSpacing={2} alignItems="center">
      <Grid size={12}>
        <h3>Para corregir el stock ingrese la cantidad </h3>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <NumericFormat
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          placeholder="Cantidad"
          name="cantidad"
          onValueChange={(e) => {
            console.log(e);
          }}
          fullWidth
          required
          label="Costo"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Button>Corregir</Button>
      </Grid>
    </Grid>
  );
}

export default Reponer;
