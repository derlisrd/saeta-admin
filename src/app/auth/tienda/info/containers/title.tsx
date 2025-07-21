import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";

function Title() {
    return <Card>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Nombre de tienda virtual
            </Typography>
            <TextField fullWidth label="Nombre de tienda virtual" helperText="Máximo 12 caracteres" />
        </CardContent>
        <CardActions>
            <Button>Guardar cambios</Button>
        </CardActions>
    </Card>
}

export default Title;