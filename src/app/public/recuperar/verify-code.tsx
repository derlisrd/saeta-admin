import { useState, useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Paper,
    Stack,
    Link,
    Alert,
} from '@mui/material';
import Icon from '@/components/ui/icon';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '@/services/api';
import { useMutation } from '@tanstack/react-query';


// --- Tipos e Interfaces ---
// Definimos el tipo para los elementos de entrada, que serán HTMLInputElement
type InputElement = HTMLInputElement;



// --- Componente principal ---
function VerifyCode() {
    const nav = useNavigate()
    const location = useLocation()

    const email = location.state?.email || ''

    const [error, setError] = useState<{ code: number; message: string } | null>(null);

    // Estado para cada dígito del OTP. Explicitamos que es un array de strings.
    const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
    // Referencias para cada TextField. Especificamos que son HTMLInputElement o null.
    const inputRefs = useRef<(InputElement | null)[]>([]);

    // Función para manejar el cambio en los campos de texto
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { value } = e.target; // Obtenemos el valor del input
        // Solo permitir un dígito numérico
        if (isNaN(Number(value))) return; // Convertimos a número para la validación

        // Actualiza el estado del OTP
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Mover el foco al siguiente campo automáticamente
        if (value !== '' && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus(); // Usamos optional chaining por seguridad
        }
    };

    // Función para manejar las pulsaciones de teclado (especialmente Backspace)
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
        }
    };


    // Función para manejar el pegado de código
    const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => { // El evento de pegado ocurre en el div Stack
        event.preventDefault(); // Prevenir el pegado predeterminado
        const paste = event.clipboardData.getData('text');
        if (!/^\d{6}$/.test(paste)) return; // Validar que sean 6 dígitos numéricos

        const newOtp = paste.split('');
        setOtp(newOtp);
        // Enfocar el último campo después de pegar
        if (inputRefs.current[3]) {
            inputRefs.current[3]?.focus();
        }
    };


    const { mutateAsync } = useMutation({
        mutationKey: ["verify-code"],
        mutationFn: async () => API.password.verifyCode(otp.join(''), email),
        onSuccess: (data) => {
            if (data) {
                nav(`/recuperar/reset-password?token=${data.token}`);
            }
        },
        onError: (error) => {
            setError({ code: 400, message: error.message || "Error en conexion" });
        },
    })

    // Función para manejar la verificación
    const handleVerify = () => {
        const fullOtp = otp.join('');
        console.log('OTP a verificar:', fullOtp);
        if (fullOtp.length === 4) {
            mutateAsync()
        } else {
            alert('Por favor, ingresa los 4 dígitos del código.');
        }
    };

    // Función para manejar el reenvío de código
    const handleResend = () => {

        setOtp(new Array(4).fill('')); // Reiniciar los campos OTP
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus(); // Enfocar el primer campo
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
                <Box>
                    📩
                </Box>

                <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Verifica tu email
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Te hemos enviado un código de verificación a tu correo electrónico.
                </Typography>
                {error && <Alert severity="error">{error.message}</Alert>}
                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{ mb: 3 }}
                    onPaste={handlePaste} // Manejar el pegado en el contenedor
                >
                    {otp.map((data, index) => (
                        <TextField
                            key={index}
                            // Explicitamos el tipo de elemento para inputRef
                            inputRef={(el: InputElement | null) => (inputRefs.current[index] = el)}
                            type="text"
                            slotProps={{
                                htmlInput: {
                                    maxLength: 1,
                                }

                            }}
                            sx={{
                                width: { xs: 40, sm: 50 },
                                height: { xs: 40, sm: 50 },
                                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                fontWeight: 'bold',
                                '& input': {
                                    padding: '10px',
                                    borderRadius: '4px',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                            value={data}
                            onChange={(e) => handleChange(e, index)} // Pasamos el evento directamente
                            onFocus={(e) => e.target.select()}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)} // Pasamos el evento directamente

                        />
                    ))}
                </Stack>

                <Button
                    fullWidth
                    sx={{ mb: 3 }}
                    onClick={handleVerify}
                    disabled={otp.join('').length !== 4}
                >
                    Verificar
                </Button>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    No recibiste el código?
                    <Link
                        component="button"
                        variant="body2"
                        onClick={handleResend}
                        sx={{
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },

                        }}
                    >
                        Re enviar
                    </Link>
                </Typography>

                <Button

                    startIcon={<Icon name='arrow-narrow-left-dashed' />}
                    onClick={() => nav('/')}
                >
                    Volver al inicio
                </Button>
            </Paper>
        </Box>
    );
}

export default VerifyCode;