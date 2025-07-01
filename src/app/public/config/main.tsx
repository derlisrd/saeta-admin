import {
    Container,
    Typography,
    Paper,
    LinearProgress,
    Fade
} from "@mui/material";
import { useConfigContext } from "./_provider/provider";
import Form1 from "./_containers/form1";
import Form2 from "./_containers/form2";
import Success from "./_containers/success";





function MainConfig() {
    const { step, isPending } = useConfigContext();

    const steps: { [key: string]: JSX.Element } = {
        "1": <Form1 />,
        "2": <Form2 />,
        "3": <Success />,
    };



    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Configuración
            </Typography>
            {isPending && <Fade in={true} timeout={1200}>
                <LinearProgress sx={{ mb: 2 }} />
            </Fade>}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                {steps[step]}
            </Paper>
        </Container>
    );
}

export default MainConfig;