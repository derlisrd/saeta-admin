import Icon from "@/components/ui/icon";
import { TextField, Stack, Button, Typography, Container, InputAdornment, CircularProgress, Alert, Box, Link as Enlace, } from "@mui/material";
import { useState } from "react"; // Importa useState si necesitas manejar estados locales
import { Link } from "react-router-dom";

function RecuperarPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Ejemplo de estado de carga
    const [error, setError] = useState<{ code: number; message: string } | null>(null); // Ejemplo de estado de error
    const [message, setMessage] = useState<string | null>(null); // Ejemplo de estado de mensaje de éxito

    const handleRecuperarPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);

        // Simulación de una llamada asíncrona para enviar el correo de recuperación
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (email === "test@example.com") {
            setMessage("Se ha enviado un enlace de recuperación a tu correo electrónico.");
        } else {
            setError({ code: 1, message: "No se encontró ninguna cuenta con ese correo electrónico." });
        }

        setIsLoading(false);
    };

    return (
        <Container maxWidth="md">
            {isLoading ? (
                <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <CircularProgress />
                </Stack>
            ) : (
                <form onSubmit={handleRecuperarPassword}>
                    <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
                        <Stack gap={2} p={3} boxShadow={5} borderRadius={3} maxWidth={360} width="100%" alignItems="center" sx={{ border: "1px solid #efefef" }}>
                            <Typography variant="button">
                                RECUPERAR CONTRASEÑA
                            </Typography>
                            {error && <Alert severity="error">{error.message}</Alert>}
                            {message && <Alert severity="success">{message}</Alert>}

                            <TextField
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon name="mail" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                autoFocus
                                required
                                variant="outlined"
                                placeholder="Tu correo electrónico"
                                label="Correo electrónico"
                                fullWidth
                                type="email"
                                onChange={({ target }) => {
                                    setEmail(target.value);
                                }}
                                value={email}
                            />

                            <Button variant="contained" type="submit" size="large">
                                Enviarme código
                            </Button>
                            <Box sx={{ width: '100%', textAlign: 'right' }}>
                                <Enlace component={Link} to="/" color="primary">
                                    ¿Ya tienes una cuenta? Iniciar sesión
                                </Enlace>
                            </Box>
                        </Stack>
                    </Stack>
                </form>
            )}
        </Container>
    );
}

export default RecuperarPassword;