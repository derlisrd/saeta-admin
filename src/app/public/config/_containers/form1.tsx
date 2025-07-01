// _containers/form1.tsx
import { Box, Button, Fade, Grid, TextField, Typography } from "@mui/material";
import { useConfigContext } from "../_provider/provider";
import Icon from "@/components/ui/icon";
import { useForm, SubmitHandler, Controller } from "react-hook-form"; // Removed yup and resolver

// Define the shape of data for Form1 specifically
type Form1Data = {
    nombre: string;
    ruc: string;
    telefono: string;
    direccion: string;
    propietario: string;
};

function Form1() {
    const { nextStep, setFormData, formData } = useConfigContext();

    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger // Keep trigger for manual validation if desired
    } = useForm<Form1Data>({
        // No resolver needed here
        defaultValues: {
            nombre: formData.nombre,
            ruc: formData.ruc,
            telefono: formData.telefono,
            direccion: formData.direccion,
            propietario: formData.propietario,
        }
    });

    const onSubmit: SubmitHandler<Form1Data> = (data) => {
        setFormData(prev => ({ ...prev, ...data })); // Save Form1 data to provider
        nextStep(); // Move to the next step
    };

    return (
        <Fade in={true} timeout={1200}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Typography variant="h6">Datos de empresa</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Controller
                            name="nombre"
                            control={control}
                            rules={{ required: "El nombre de la empresa es obligatorio" }} // Validation rule
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoFocus
                                    autoComplete="off"
                                    label="Nombre de empresa o razon social"
                                    fullWidth
                                    error={!!errors.nombre}
                                    helperText={errors.nombre?.message}
                                    onBlur={() => trigger("nombre")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="propietario"
                            control={control}
                            rules={{ required: "El propietario es obligatorio" }} // Validation rule
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Propietario o representante"
                                    fullWidth
                                    error={!!errors.propietario}
                                    helperText={errors.propietario?.message}
                                    onBlur={() => trigger("propietario")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="ruc"
                            control={control}
                            rules={{
                                required: "El RUC es obligatorio",
                                minLength: { value: 5, message: "El RUC o Doc debe tener al menos 5 caracteres" },
                                pattern: { value: /^[0-9-]+$/, message: "El RUC solo debe contener números" }
                            }} // Validation rules
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Ruc o documento"
                                    fullWidth
                                    error={!!errors.ruc}
                                    helperText={errors.ruc?.message}
                                    onBlur={() => trigger("ruc")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="telefono"
                            control={control}
                            rules={{
                                required: "El teléfono es obligatorio",
                                pattern: { value: /^[0-9]+$/, message: "El teléfono solo debe contener números" }
                            }} // Validation rules
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Telefono"
                                    fullWidth
                                    error={!!errors.telefono}
                                    helperText={errors.telefono?.message}
                                    onBlur={() => trigger("telefono")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Controller
                            name="direccion"
                            control={control}
                            rules={{ required: "La dirección es obligatoria" }} // Validation rule
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoComplete="off"
                                    label="Direccion"
                                    fullWidth
                                    error={!!errors.direccion}
                                    helperText={errors.direccion?.message}
                                    onBlur={() => trigger("direccion")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button type="submit" endIcon={<Icon name="arrow-narrow-right-dashed" />}>
                                Continuar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Fade>
    );
}

export default Form1;