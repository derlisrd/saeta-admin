import Icon from "@/components/ui/icon";
import { Button, Fade, Stack, Typography } from "@mui/material";
import { useConfigContext } from "../_provider/provider";

function Success() {
    const { finalizar } = useConfigContext();
    return (
        <Fade in={true} timeout={1600}>

            <Stack spacing={4} alignItems='center' justifyContent='center'>
                <Icon name="progress-check" size={100} color="#00a76f" />
                <Typography variant="h6">
                    ¡Configuración completada!
                </Typography>
                <Button onClick={finalizar} >Comenzar !</Button>
            </Stack>
        </Fade >
    );
}

export default Success;