import Icon from "@/components/ui/icon";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { useUserProvider } from "../provider";
import { useForm } from "react-hook-form";
import useResetPassword from "../_hooks/useResetPassword";
import { useEffect } from "react";

function PasswordModal() {
    const { modals, handleModals, selectedUser, setSelectedUser } = useUserProvider();
    const { isPending, error, mutateAsync, isSuccess } = useResetPassword()
    // 1. Inicializa useForm sin resolver externo
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError, // Necesario para errores personalizados
        clearErrors, // Necesario para limpiar errores personalizados
        reset, // Para limpiar el formulario
    } = useForm({
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    });

    useEffect(() => {
        if (isSuccess) {
            close(); // Cierra el modal si la operación fue exitosa
        }
    }, [isSuccess]); // Se ejecuta cada vez que isSuccess cambia

    const close = () => {
        setSelectedUser(null);
        handleModals('password');
        reset();
        clearErrors();
    }


    // 2. Función para manejar el envío del formulario con validación personalizada
    const onSubmit = (data: { password: any; password_confirmation: any; }) => {
        // Valida que las contraseñas coincidan
        if (data.password !== data.password_confirmation) {
            setError("password_confirmation", {
                type: "manual",
                message: "Las contraseñas no coinciden.",
            });
            return; // Detiene el envío si hay un error de coincidencia
        }
        mutateAsync({
            ...data,
            id: selectedUser ? selectedUser.id : 0,
        })
    };

    return (
        <Dialog open={modals.password} onClose={() => close()}>
            <DialogTitle>Restablecer contraseña </DialogTitle>
            <DialogContent>
                <Stack gap={3} mt={1}>
                    {isPending && <LinearProgress />}

                    {error && <Alert severity="error">{error.message}</Alert>}

                    <Typography>Atención: Esta acción no se puede deshacer. Restablecer la contraseña de este usuario. **{selectedUser?.name}** </Typography>
                    <TextField
                        fullWidth
                        disabled={isPending}
                        label="Contraseña"
                        autoFocus
                        type="password"
                        {...register("password", {
                            required: "La contraseña es obligatoria.",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres.",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        fullWidth
                        disabled={isPending}
                        label="Repetir contraseña"
                        type="password"
                        {...register("password_confirmation", {
                            required: "Confirma tu contraseña.",
                        })}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" startIcon={<Icon name="arrow-narrow-left-dashed" />} disabled={isPending} onClick={close}>
                    Regresar
                </Button>
                <Button onClick={handleSubmit(onSubmit)} endIcon={<Icon name="device-floppy" />} disabled={isPending}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PasswordModal;