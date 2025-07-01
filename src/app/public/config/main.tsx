import {
    Box,

    Container,

    Typography,
    Paper,

    LinearProgress
} from "@mui/material";
import { useEffect } from "react";
import { useConfigContext } from "./_provider/provider";
import Form1 from "./_containers/form1";






function MainConfig() {
    const { step } = useConfigContext();

    const steps: { [key: string]: JSX.Element } = {
        "1": <Form1 />,
    };



    return (
        <Container maxWidth="md" sx={{ py: 4 }}>

            <Paper elevation={0} sx={{ padding: 3, borderRadius: 4, mb: 3 }}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h4">
                        Configuración Inicial
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                        Completa los datos para finalizar la configuración
                    </Typography>

                    <Box sx={{ mt: 3, mb: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={50}

                        />
                    </Box>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Paso {step} de 2
                    </Typography>
                </Box>
            </Paper>


            <Paper sx={{ p: 3, borderRadius: 3 }}>
                {steps[step]}
            </Paper>

        </Container>
    );
}

export default MainConfig;