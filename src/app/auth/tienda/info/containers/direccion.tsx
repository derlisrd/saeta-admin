import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useOptionsProvider } from "../provider";
import { useEffect, useState } from "react";

export default function Direccion() {
    const { options, isPending, updateInfoOption } = useOptionsProvider()
    const [title, setTitle] = useState("");

    // Buscar la opción específica para el nombre de tienda
    const titleOption = options.find(option => option.key === "direccion");

    useEffect(() => {
        if (titleOption) {
            setTitle(titleOption.value || "");
        }
    }, [titleOption]);


    const enviar = () => {

        updateInfoOption({
            key: "direccion",
            value: title,
            json: 0
        });

    };



    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Dirección de tu tienda
                </Typography>
                <TextField
                    fullWidth
                    label="Direccion de tu tienda"
                    helperText="Si tu tienda no tiene dirección fisica, deja en blanco este espacio"
                    placeholder="Completa la direccion de tu tienda"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isPending}
                />
            </CardContent>
            <CardActions>
                <Button disabled={isPending} onClick={enviar}>
                    Guardar cambios
                </Button>
            </CardActions>
        </Card>
    );
}

