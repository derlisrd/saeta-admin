import Icon from "@/components/ui/icon";
import API from "@/services/api";
import { TextField, Stack, Button, Typography, Container, InputAdornment, CircularProgress, Alert, Box, Link as Enlace, } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"; // Importa useState si necesitas manejar estados locales
import { Link, useNavigate } from "react-router-dom";

function RecuperarPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<{ code: number; message: string } | null>(null); // Ejemplo de estado de error// Ejemplo de estado de mensaje de éxito

    const nav = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["send-code"],
        mutationFn: async () => API.password.sendCode(email),
        onSuccess: () => {
            setError(null);
            nav("/recuperar/verify-code", { state: { email } });
        },
        onError: (error) => {
            setError({ code: 400, message: error.message || "Error en conexion" });
        },
    })

    const handleRecuperarPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        mutateAsync()
    };

    return (
        <Container maxWidth="md">
            {isPending ? (
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