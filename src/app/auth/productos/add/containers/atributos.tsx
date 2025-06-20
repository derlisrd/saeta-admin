import Icon from "@/components/ui/icon";
import { Button, Grid2 as Grid, TextField, Typography, IconButton } from "@mui/material";
import { Fragment, useState } from "react";

type AtributosForm = {
    nombre: string;
    valores: string[];
};

function Atributos() {
    const [atributosForm, setAtributosForm] = useState<AtributosForm[]>([
        { nombre: "", valores: [""] }
    ]);

    const handleAddAtributo = () => {
        setAtributosForm([...atributosForm, { nombre: "", valores: [""] }]);
    };

    const handleAddOpcion = (atributoIndex: number) => {
        const newAtributos = [...atributosForm];


        if (newAtributos[atributoIndex].nombre.length === 0) {
            return
        }

        newAtributos[atributoIndex].valores.push("");
        setAtributosForm(newAtributos);
    };

    const handleNombreChange = (atributoIndex: number, value: string) => {
        const newAtributos = [...atributosForm];
        newAtributos[atributoIndex].nombre = value;
        setAtributosForm(newAtributos);
    };

    const handleValorChange = (atributoIndex: number, valorIndex: number, value: string) => {
        const newAtributos = [...atributosForm];
        newAtributos[atributoIndex].valores[valorIndex] = value;
        setAtributosForm(newAtributos);
    };

    const handleRemoveOpcion = (atributoIndex: number, valorIndex: number) => {
        const newAtributos = [...atributosForm];
        if (newAtributos[atributoIndex].valores.length > 1) {
            newAtributos[atributoIndex].valores.splice(valorIndex, 1);
            setAtributosForm(newAtributos);
        }
    };

    const handleRemoveAtributo = (atributoIndex: number) => {
        if (atributosForm.length > 1) {
            const newAtributos = atributosForm.filter((_, index) => index !== atributoIndex);
            setAtributosForm(newAtributos);
        }
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
                        <TextField
                            label="Nombre"
                            fullWidth
                            sx={{ marginTop: 1 }}
                            value={atributo.nombre}
                            onChange={(e) => handleNombreChange(atributoIndex, e.target.value)}
                            placeholder="Ej: Color, Tamaño..."
                        />
                        {atributosForm.length > 1 && (
                            <IconButton
                                onClick={() => handleRemoveAtributo(atributoIndex)}
                                size="small"
                                color="error"
                                sx={{ mt: 1 }}
                            >
                                <Icon name="trash" />
                            </IconButton>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4, md: 5 }}>
                        {atributo.valores.map((valor, valorIndex) => (
                            <div key={valorIndex} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <TextField
                                    label={`Opción ${valorIndex + 1}`}
                                    fullWidth
                                    sx={{ marginTop: 1 }}
                                    value={valor}
                                    onChange={(e) => handleValorChange(atributoIndex, valorIndex, e.target.value)}
                                    placeholder="Ej: Rojo, Azul..."
                                />
                                {atributo.valores.length > 1 && (
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
                    Agregar más atributos
                </Button>
            </Grid>
        </Grid>
    );
}

export default Atributos;