import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useOptionsProvider } from "../../provider";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

export default function Telefono() {
    const { options, isPending, updateInfoOption } = useOptionsProvider()
    const [title, setTitle] = useState("");

    // Buscar la opción específica para el nombre de tienda
    const titleOption = options.find(option => option.key === "telefono");

    useEffect(() => {
        if (titleOption) {
            setTitle(titleOption.value || "");
        }
    }, [titleOption]);


    const enviar = () => {

        updateInfoOption({
            key: "telefono",
            value: title,
            json: 0
        });

    };



    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Teléfono de contacto
                </Typography>
                <TextField
                    fullWidth
                    label="Teléfono"
                    helperText="Número de contacto"
                    slotProps={{
                        input: {
                            startAdornment: <Icon name="phone" />
                        }
                    }}
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

