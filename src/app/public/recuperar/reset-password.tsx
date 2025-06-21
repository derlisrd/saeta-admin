import {
    Box,
    Typography,
    Button,
    TextField,
    Paper,
    Stack,
    CircularProgress, // Importar para el spinner de carga
} from '@mui/material';
import Icon from '@/components/ui/icon';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import API from '@/services/api';
import { useState } from 'react';

// Interfaz para el error que manejaremos
interface ErrorState {
    code: number;
    message: string;
}

function ResetPassword() {
    const [params] = useSearchParams();
    const nav = useNavigate();

    // Obtener 'token' y 'email' de los parámetros de consulta
    const token = params.get('token') || '';

    // Estados para las contraseñas
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    // Estado para manejar errores en la interfaz
    const [error, setError] = useState<ErrorState | null>(null);

    // Definición de la mutación para restablecer la contraseña
    const {
        mutateAsync,
        isPending, // Indica si la mutación está en curso// Indica si la mutación fue exitosa
    } = useMutation<any, ErrorState, void>({ // Aquí puedes tipar los argumentos: data, error, variables
        mutationKey: ["reset-password"], // Clave única para esta mutación
        mutationFn: async () => {
            // Asegúrate de que API.password.reset maneje token, password y passwordConfirmation
            return API.password.reset(token, password, passwordConfirmation);
        },
        onSuccess: () => {
            // Lógica cuando la mutación es exitosa
            // Redirigimos a una página de éxito o al login con un indicador
            nav('/?resetSuccess=true');
        },
        onError: (err: any) => { // Especificamos el tipo de error
            // Lógica cuando la mutación falla
            // Intentamos extraer el mensaje de error de la respuesta de la API
            const errorMessage = err.response?.data?.message || err.message || "Error en la conexión o datos inválidos.";
            const errorCode = err.response?.status || 400;
            setError({ code: errorCode, message: errorMessage });
        },
    });

    // Función para manejar el envío del formulario al hacer clic en el botón
    const handleSubmit = async () => {
        setError(null); // Limpiar errores previos antes de intentar un nuevo envío

        // Validaciones en el cliente
        if (!password) {
            setError({ code: 400, message: 'La nueva contraseña no puede estar vacía.' });
            return;
        }
        if (password.length < 6) {
            setError({ code: 400, message: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }
        if (password !== passwordConfirmation) {
            setError({ code: 400, message: 'Las contraseñas no coinciden.' });
            return;
        }

        try {
            // Ejecutar la mutación
            await mutateAsync();
        } catch (err) {
            // Los errores ya son manejados por el 'onError' del useMutation.
            // No es necesario añadir lógica adicional aquí a menos que sea un caso específico.
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                    maxWidth: 360,
                    width: '100%',
                }}
            >
                {/* --- */}
                <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Restablece tu contraseña
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Ingresa tu nueva contraseña.
                </Typography>

                {/* Mostrar mensaje de error si existe */}
                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error.message}
                    </Typography>
                )}

                {/* --- */}
                {/* Campos de contraseña */}
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    sx={{ mb: 3 }}
                >
                    <TextField
                        autoFocus
                        label="Nueva contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // Mostrar error si la validación falla o si hay un error general
                        error={!!error && (error.message.includes('contraseña') || error.message.includes('vacía') || error.message.includes('caracteres'))}
                        helperText={!!error && (error.message.includes('contraseña') || error.message.includes('vacía') || error.message.includes('caracteres')) ? error.message : ''}
                        fullWidth
                    />
                    <TextField
                        label="Confirmar contraseña"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        // Mostrar error si las contraseñas no coinciden
                        error={!!error && error.message.includes('coinciden')}
                        helperText={!!error && error.message.includes('coinciden') ? error.message : ''}
                        fullWidth
                    />
                </Stack>

                {/* --- */}
                {/* Botón de restablecer */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mb: 3 }}
                    onClick={handleSubmit}
                    // Deshabilitar mientras carga, o si los campos están vacíos, o si hay un error de validación
                    disabled={isPending || !password || !passwordConfirmation || !!error}
                    startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null} // Spinner de carga
                >
                    {isPending ? 'Restableciendo...' : 'Restablecer'}
                </Button>

                {/* --- */}
                {/* Botón de volver al inicio */}
                <Button
                    variant='outlined'
                    startIcon={<Icon name='arrow-narrow-left-dashed' />}
                    onClick={() => nav("/")}
                    fullWidth // Hacer que ocupe todo el ancho
                >
                    Volver al inicio
                </Button>
            </Paper>
        </Box>
    );
}

export default ResetPassword;