import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { useOptionsProvider } from "../../provider";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

export default function Whatsapp() {
    const { options, isPending, updateInfoOption } = useOptionsProvider()
    const [title, setTitle] = useState("");

    // Buscar la opción específica para el nombre de tienda
    const titleOption = options.find(option => option.key === "whatsapp");

    useEffect(() => {
        if (titleOption) {
            setTitle(titleOption.value || "");
        }
    }, [titleOption]);


    const enviar = () => {

        updateInfoOption({
            key: "whatsapp",
            value: title,
            json: 0
        });

    };



    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    WhatsApp
                </Typography>
                <TextField fullWidth
                    slotProps={{
                        input: {
                            startAdornment: <Icon name="brand-whatsapp" />
                        }
                    }}
                    label="Whatsapp" helperText="Número de whatsapp" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isPending} />
            </CardContent>
            <CardActions>
                <Button disabled={isPending} onClick={enviar}>
                    Guardar cambios
                </Button>
            </CardActions>
        </Card>
    );
}

