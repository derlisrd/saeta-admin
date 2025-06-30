import { Box, Button, Stack } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";

function SenderForm() {
    const { loading, sendForm, } = useAddProducto();
    return <Box
        sx={{
            position: "fixed",
            bottom: 0, // Lo fija en la parte inferior
            left: 0, // Para que ocupe todo el ancho
            right: 0, // Para que ocupe todo el ancho
            zIndex: 1000, // Asegura que esté por encima de otros elementos
            backdropFilter: "blur(5px)",
            padding: 2,
            // Para que ocupe todo el ancho del contenedor padre
            width: "100%",
            // Agregamos un poco de sombra para que se vea mejor
            boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
        }}
    >
        {/* Usamos un Stack para organizar los botones en una fila */}
        <Stack direction="row" spacing={2} sx={{ width: "100%" }} justifyContent="flex-end">
            <Button variant="outlined">
                Cancelar
            </Button>
            <Button
                disabled={loading}
                onClick={sendForm}
            >
                {loading ? "Guardando..." : "Guardar"}
            </Button>
        </Stack>
    </Box>
}

export default SenderForm;