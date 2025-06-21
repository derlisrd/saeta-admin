import Icon from "@/components/ui/icon";
import { Button, Grid2 as Grid, TextField, Typography, IconButton, Tooltip, Autocomplete, Chip } from "@mui/material";
import { Fragment, useState } from "react";
import useAddProducto from "../_hook/useAddProducto";
import { AddProducto } from "@/services/dto/productos/AddProducto";

function Atributos() {
    const { form, setForm } = useAddProducto()
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

    const atributosForm = form.atributos || [{
        nombre: "",
        opciones: [],
    }]

    const handleAddAtributo = () => {
        const lastIndex = atributosForm.length - 1;
        if (lastIndex > -1 && atributosForm[lastIndex].nombre === "") {
            return;
        }
        setForm((prev) => new AddProducto({
            ...prev,
            atributos: [...prev.atributos, { nombre: "", opciones: [] }],
        }));
    }

    const handleNombreTextChange = (atributoIndex: number, value: string) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos[atributoIndex].nombre = value;
            return new AddProducto({ ...prev, atributos: newAtributos });
        });
    };

    const handleOpcionesChange = (atributoIndex: number, newValue: string[]) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos[atributoIndex].opciones = newValue;
            return new AddProducto({ ...prev, atributos: newAtributos });
        });
    };

    const handleInputChange = (atributoIndex: number, inputValue: string) => {
        setInputValues(prev => ({
            ...prev,
            [atributoIndex]: inputValue
        }));
    };

    const handleRemoveAtributo = (atributoIndex: number) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos.splice(atributoIndex, 1);
            return new AddProducto({ ...prev, atributos: newAtributos });
        });
        // Limpiar el input value del atributo eliminado
        setInputValues(prev => {
            const newInputValues = { ...prev };
            delete newInputValues[atributoIndex];
            return newInputValues;
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography>Agregar atributos al producto</Typography>
                <Typography variant="caption">Ej: color, tamaño, propiedades, etc.</Typography>
            </Grid>
            {atributosForm.map((atributo, atributoIndex) => (
                <Fragment key={atributoIndex}>
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TextField
                                autoFocus
                                label="Nombre"
                                fullWidth
                                sx={{ marginTop: 1 }}
                                value={atributo.nombre}
                                onChange={(e) => handleNombreTextChange(atributoIndex, e.target.value)}
                                placeholder="Ej: Color, Tamaño..."
                            />
                            {atributosForm.length > 0 && (
                                <Tooltip title="Eliminar atributo" placement="top" arrow>
                                    <IconButton
                                        onClick={() => handleRemoveAtributo(atributoIndex)}
                                        size="small"
                                        color="error"
                                        sx={{ mt: 1 }}
                                    >
                                        <Icon name="trash" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 8, md: 9 }}>
                        <Autocomplete
                            multiple
                            freeSolo
                            options={[]} // Sin opciones predeterminadas
                            value={atributo.opciones}
                            onChange={(_, newValue) => {
                                // Filtrar valores vacíos
                                const filteredValues = newValue.filter(value =>
                                    typeof value === 'string' && value.trim() !== ''
                                );
                                handleOpcionesChange(atributoIndex, filteredValues);
                            }}
                            inputValue={inputValues[atributoIndex] || ''}
                            onInputChange={(_, newInputValue) => {
                                handleInputChange(atributoIndex, newInputValue);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    const inputValue = inputValues[atributoIndex]?.trim();
                                    if (inputValue && !atributo.opciones.includes(inputValue)) {
                                        const newOpciones = [...atributo.opciones, inputValue];
                                        handleOpcionesChange(atributoIndex, newOpciones);
                                        handleInputChange(atributoIndex, '');
                                    }
                                }
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        size="small"
                                        {...getTagProps({ index })}
                                        key={index}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Opciones"
                                    placeholder={atributo.opciones.length === 0 ? "Escribe una opción y presiona Enter" : "Agregar más opciones..."}
                                    sx={{ marginTop: 1 }}
                                    helperText="Presiona Enter para agregar cada opción"
                                />
                            )}

                        />
                    </Grid>
                </Fragment>
            ))}

            <Grid size={12}>
                <Button
                    endIcon={<Icon name="plus" />}
                    onClick={handleAddAtributo}
                    variant="contained"
                >
                    {atributosForm.length > 0 ? "Agregar otro atributo" : "Agregar atributo"}
                </Button>
            </Grid>
        </Grid>
    )
}

export default Atributos;