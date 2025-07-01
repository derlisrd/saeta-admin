// _containers/form2.tsx
import { Button, Fade, Grid, Stack, TextField, Typography } from "@mui/material";
import { useConfigContext } from "../_provider/provider";
import Icon from "@/components/ui/icon";
import { useForm, SubmitHandler, Controller } from "react-hook-form"; // Removed yup and resolver

// Define the shape of data for Form2 specifically
type Form2Data = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

function Form2() {
    const { backStep, setFormData, formData, sendForm } = useConfigContext();

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch, // Use watch to get the current value of 'password' for comparison
        trigger
    } = useForm<Form2Data>({
        // No resolver needed here
        defaultValues: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
        }
    });

    const password = watch("password", ""); // Watch the password field

    const onSubmit: SubmitHandler<Form2Data> = (data) => {
        setFormData(prev => ({ ...prev, ...data })); // Save Form2 data to provider
        sendForm();
    };

    return (
        <Fade in={true} timeout={1200}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Typography variant="h6">Datos de usuario</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "El nombre de usuario es obligatorio" }} // Validation rule
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoFocus
                                    autoComplete="off"
                                    label="Nombre"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    onBlur={() => trigger("name")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "El correo electrónico es obligatorio",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Debe ser un correo electrónico válido",
                                },
                            }} // Validation rules
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Correo electrónico"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    onBlur={() => trigger("email")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "La contraseña es obligatoria",
                                minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                            }} // Validation rules
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Contraseña"
                                    fullWidth
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    onBlur={() => trigger("password")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="password_confirmation"
                            control={control}
                            rules={{
                                required: "Confirma tu contraseña",
                                validate: (value) => value === password || "Las contraseñas no coinciden", // Custom validation
                            }} // Validation rules
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Repetir contraseña"
                                    fullWidth
                                    type="password"
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation?.message}
                                    onBlur={() => trigger("password_confirmation")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button startIcon={<Icon name="arrow-narrow-left-dashed" />} variant="outlined" onClick={backStep}>
                                Atrás
                            </Button>
                            <Button type="submit">Finalizar</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Fade>
    );
}

export default Form2;