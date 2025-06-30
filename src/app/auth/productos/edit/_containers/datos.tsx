import { Fragment } from "react";
import { Controller } from "react-hook-form";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid2 as Grid,
    InputAdornment,
    InputLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import Icon from "@/components/ui/icon";
import { useEditProductoContext } from "../provider";

function Datos() {
    const {
        medidas,
        categorias,
        impuestos,
        handleModal,
        formMethods,
        error,
        clearError
    } = useEditProductoContext();

    const { control, formState: { errors } } = formMethods;

    // Reglas de validación
    const validationRules = {
        nombre: {
            required: "El nombre es obligatorio",
            minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres"
            }
        },
        impuesto_id: {
            required: "Debe seleccionar un impuesto",
            validate: (value: number) => value !== 0 || "Debe seleccionar un impuesto válido"
        },
        category_id: {
            required: "Debe seleccionar una categoría",
            validate: (value: number) => value !== 0 || "Debe seleccionar una categoría válida"
        },
        medida_id: {
            required: "Debe seleccionar una unidad de medida",
            validate: (value: number) => value !== 0 || "Debe seleccionar una unidad válida"
        },
        costo: {
            required: "El costo es obligatorio",
            validate: (value: number) => value > 0 || "Debe ser mayor a 0"
        },
        precio_normal: {
            required: "El precio normal es obligatorio",
            validate: (value: number, formValues: { costo: number }) => {
                if (value <= 0) return "Debe ser mayor a 0";
                if (value <= formValues.costo) return "Debe ser mayor al costo";
                return true;
            }
        },
        precio_minimo: {
            required: "El precio mínimo es obligatorio",
            validate: (value: number, formValues: { costo: number, precio_normal: number }) => {
                if (value <= 0) return "Mínimo debe ser mayor a 0";
                if (value <= formValues.costo) return "Mínimo debe ser mayor al costo";
                if (value >= formValues.precio_normal) return "Mínimo debe ser menor al precio normal";
                return true;
            }
        }
    };

    // Función para obtener el error específico del provider
    const getProviderError = (fieldCode: number) => {
        return error.code === fieldCode ? error.message : "";
    };

    // Función para obtener si hay error del provider
    const hasProviderError = (fieldCode: number) => {
        return error.code === fieldCode;
    };

    return (
        <Fragment>
            <Grid container spacing={{ xs: 2 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="codigo"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon name='barcode' />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                fullWidth
                                disabled
                                label="Código de barras"
                            />
                        )}
                    />

                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Tooltip arrow placement='top' title="No se puede cambiar el código de barras">
                        <Button>Generar</Button>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <FormLabel id="tipo">Seleccione tipo:</FormLabel>
                        <Controller
                            name="tipo"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <FormControlLabel
                                        checked={field.value === 1}
                                        onChange={() => {
                                            field.onChange(1);
                                            clearError(); // Limpiar errores al cambiar
                                        }}
                                        control={<Checkbox icon={<Icon name='circle-dashed' />} checkedIcon={<Icon name='circle-check' />} />}
                                        label="Producto"
                                    />
                                    <FormControlLabel
                                        checked={field.value === 2}
                                        onChange={() => {
                                            field.onChange(2);
                                            clearError();
                                        }}
                                        control={<Checkbox icon={<Icon name='circle-dashed' />} checkedIcon={<Icon name='circle-check' />} />}
                                        label="Servicio"
                                    />
                                </>
                            )}
                        />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="disponible"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                checked={field.value === 1}
                                onChange={() => {
                                    field.onChange(field.value === 1 ? 0 : 1);
                                    clearError();
                                }}
                                control={<Checkbox icon={<Icon name='circle-dashed' />} checkedIcon={<Icon name='circle-check' />} />}
                                label="Mostrar en tienda virtual"
                            />
                        )}
                    />
                </Grid>

                <Grid size={12}>
                    <Typography variant="button">INFORMACION</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="nombre"
                        control={control}
                        rules={validationRules.nombre}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.nombre || hasProviderError(2)}
                                helperText={errors.nombre?.message || getProviderError(2)}
                                placeholder="Nombre"
                                fullWidth
                                required
                                autoComplete="off"
                                label="Nombre"
                                onChange={(e) => {
                                    field.onChange(e);
                                    clearError();
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ""}
                                placeholder="Descripción detallada del producto"
                                fullWidth
                                label="Descripción detallada"
                                onChange={(e) => {
                                    field.onChange(e);
                                    clearError();
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="impuesto_id"
                        control={control}
                        rules={validationRules.impuesto_id}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.impuesto_id || hasProviderError(3)}>
                                <InputLabel id="impuesto-select-label">Impuesto</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    labelId="impuesto-label"
                                    id="impuesto"
                                    label="Impuesto"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        clearError();
                                    }}
                                >
                                    <MenuItem value={0} disabled>
                                        Seleccionar impuesto
                                    </MenuItem>
                                    {impuestos.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {errors.impuesto_id?.message || getProviderError(3) || "IVA"}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="category_id"
                        control={control}
                        rules={validationRules.category_id}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.category_id || hasProviderError(4)}>
                                <InputLabel id="categoria-select-label">Categoría</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    labelId="categorias-label"
                                    id="Categoria"
                                    label="Categoría"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        clearError();
                                    }}
                                >
                                    <MenuItem value={0} disabled>
                                        Seleccionar categoria
                                    </MenuItem>
                                    {categorias.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                                    <List>
                                        <ListItemButton onClick={() => handleModal("categorias")}>
                                            <ListItemIcon>
                                                <Icon name='circle-plus' />
                                            </ListItemIcon>
                                            <ListItemText primary="Agregar categoria" />
                                        </ListItemButton>
                                    </List>
                                </Select>
                                <FormHelperText>
                                    {errors.category_id?.message || getProviderError(4) || "Categoría"}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                        name="medida_id"
                        control={control}
                        rules={validationRules.medida_id}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.medida_id || hasProviderError(5)}>
                                <InputLabel id="medidas-select-label">Unidad de medida</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    labelId="medidas-label"
                                    required
                                    id="Medidas"
                                    label="Unidad de medida"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        clearError();
                                    }}
                                >
                                    <MenuItem value={0} disabled>
                                        Seleccionar medida
                                    </MenuItem>
                                    {medidas.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.descripcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {errors.medida_id?.message || getProviderError(5) || "c/u"}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>

                <Grid size={12}>
                    <Typography variant="button">VALORES</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="costo"
                        control={control}
                        rules={validationRules.costo}
                        render={({ field }) => (
                            <NumericFormat
                                customInput={TextField}
                                thousandSeparator="."
                                decimalSeparator=","
                                placeholder="Costo"
                                value={field.value}
                                onValueChange={(values) => {
                                    field.onChange(Number(values.value));
                                    clearError();
                                }}
                                fullWidth
                                required
                                label="Costo"
                                helperText={errors.costo?.message || getProviderError(6) || "Costo del producto"}
                                error={!!errors.costo || hasProviderError(6)}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="precio_normal"
                        control={control}
                        rules={validationRules.precio_normal}
                        render={({ field }) => (
                            <NumericFormat
                                customInput={TextField}
                                thousandSeparator="."
                                decimalSeparator=","
                                placeholder="Precio normal"
                                value={field.value}
                                onValueChange={(values) => {
                                    field.onChange(Number(values.value));
                                    clearError();
                                }}
                                fullWidth
                                required
                                label="Precio normal"
                                helperText={errors.precio_normal?.message || getProviderError(7) || "Precio"}
                                error={!!errors.precio_normal || hasProviderError(7)}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="precio_minimo"
                        control={control}
                        rules={validationRules.precio_minimo}
                        render={({ field }) => (
                            <NumericFormat
                                customInput={TextField}
                                thousandSeparator="."
                                decimalSeparator=","
                                placeholder="Precio mínimo"
                                value={field.value}
                                onValueChange={(values) => {
                                    field.onChange(Number(values.value));
                                    clearError();
                                }}
                                fullWidth
                                required
                                label="Precio mínimo"
                                helperText={errors.precio_minimo?.message || getProviderError(8) || "Precio con descuento"}
                                error={!!errors.precio_minimo || hasProviderError(8)}
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                        placeholder="Generar precios por %"
                        fullWidth
                        label="Generar precios por %"
                        helperText="Generar precios por %"
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Datos;