import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useOptionsProvider } from "../provider";
import { useEffect, useState } from "react";

export default function Descripcion() {
    const { options, isPending, updateInfoOption } = useOptionsProvider()
    const [title, setTitle] = useState("");

    // Buscar la opción específica para el nombre de tienda
    const titleOption = options.find(option => option.key === "descripcion");

    useEffect(() => {
        if (titleOption) {
            setTitle(titleOption.value || "");
        }
    }, [titleOption]);


    const enviar = () => {

        updateInfoOption({
            key: "descripcion",
            value: title,
            json: 0
        });

    };



    return <Card>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Descripción de tu tienda
            </Typography>
            <TextField
                fullWidth
                label="Descripcion de tu tienda"
                helperText={`${title.length}/144 caracteres`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={title.length > 144}
                disabled={isPending}
                multiline
                rows={1}
            />
        </CardContent>
        <CardActions>
            <Button disabled={isPending} onClick={enviar}>Guardar cambios</Button>
        </CardActions>
    </Card>
}

