import { Box, Button, Stack } from "@mui/material";
import { useEditProductoContext } from "../provider";

function SenderFormEdit() {
    const {
        isLoading,
        sendEditProducto,
        formMethods
      } = useEditProductoContext();
    
      const { formState: { errors } } = formMethods;

    const hasValidationErrors = Object.keys(errors).length > 0;

  // Función mejorada para manejar el envío
  const handleSave = async () => {
    // Trigger validation antes de enviar
    const isValid = await formMethods.trigger();

    if (!isValid) {
      // Si hay errores de validación, mostrar una alerta
      console.log("Errores de validación:", errors);
      return;
    }

    // Si es válido, proceder con el envío
    sendEditProducto();
  };

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
            onClick={handleSave}
            disabled={isLoading}
            // Opcional: cambiar color si hay errores
            color={hasValidationErrors ? "warning" : "primary"}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Stack>
    </Box>
}

export default SenderFormEdit;