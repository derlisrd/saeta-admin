import Icon from "@/components/ui/icon";
import { Button, Grid2 as Grid, TextField, Typography, IconButton, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import useAddProducto from "../_hook/useAddProducto";
import { AddProducto } from "@/services/dto/productos/AddProducto";


function Atributos() {
    const { form, setForm } = useAddProducto()

    const atributosForm = form.atributos || [{
        nombre: "",
        opciones: [""],
    }]

    const handleAddAtributo = () => {
        const lastIndex = atributosForm.length - 1;
        if (lastIndex > -1 && atributosForm[lastIndex].nombre === "") {
            return;
        }
        setForm((prev) => new AddProducto({
            ...prev,
            atributos: [...prev.atributos, { nombre: "", opciones: [""] }],
        }));

    }

    const handleAddOpcion = (atributoIndex: number) => {
        const lastIndex = atributosForm[atributoIndex].opciones.length - 1;
        if (atributosForm[atributoIndex].nombre.length === 0) {
            return;
        }
        if (lastIndex > -1 && atributosForm[atributoIndex].opciones[lastIndex] === "") {
            return;
        }
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos[atributoIndex].opciones.push("");
            return new AddProducto({ ...prev, atributos: newAtributos });
        });
    };

    const handleNombreTextChange = (atributoIndex: number, value: string) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos[atributoIndex].nombre = value;
            return new AddProducto({ ...prev, atributos: newAtributos });
        });

    };

    const handleOpcionTextChange = (atributoIndex: number, valorIndex: number, value: string) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos[atributoIndex].opciones[valorIndex] = value;
            return new AddProducto({ ...prev, atributos: newAtributos });
        })
    };

    const handleRemoveOpcion = (atributoIndex: number, valorIndex: number) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos[atributoIndex].opciones.splice(valorIndex, 1);
            return new AddProducto({ ...prev, atributos: newAtributos });
        });
    };

    const handleRemoveAtributo = (atributoIndex: number) => {
        setForm((prev) => {
            const newAtributos = [...prev.atributos];
            newAtributos.splice(atributoIndex, 1);
            return new AddProducto({ ...prev, atributos: newAtributos });
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

                    <Grid size={{ xs: 12, sm: 4, md: 5 }}>
                        {atributo.opciones.map((valor, valorIndex) => (
                            <div key={valorIndex} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <TextField
                                    label={`Opción ${valorIndex + 1}`}
                                    fullWidth
                                    sx={{ marginTop: 1 }}
                                    value={valor}
                                    onChange={(e) => handleOpcionTextChange(atributoIndex, valorIndex, e.target.value)}
                                    placeholder="Ej: Rojo, Azul..."
                                />
                                {atributo.opciones.length > 1 && (
                                    <IconButton
                                        onClick={() => handleRemoveOpcion(atributoIndex, valorIndex)}
                                        size="small"
                                        color="error"
                                        sx={{ mt: 1 }}
                                    >
                                        <Icon name="x" />
                                    </IconButton>
                                )}
                            </div>
                        ))}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Button
                            endIcon={<Icon name="plus" />}
                            onClick={() => handleAddOpcion(atributoIndex)}
                            sx={{ marginTop: 1 }}
                            variant="outlined"
                        >
                            Agregar opción
                        </Button>
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
        </Grid>)
}

export default Atributos;