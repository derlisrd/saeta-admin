import { Dialog, DialogContent, DialogTitle, TextField, LinearProgress, DialogActions, Button, Alert, Stack } from "@mui/material";
import { useForm } from "react-hook-form"; // Import useForm
import useAddProducto from "../_hook/useAddProducto";
import useAddCategoria from "../_hook/useAddCategoria";
import Icon from "@/components/ui/icon";
import { useEffect } from "react"; // Import useEffect
import { AddCategoria } from "@/services/dto/productos/AddCategoria";

function AddCategoriaModal() {
  const { modal, handleModal, setNoti } = useAddProducto();

  // Use useForm for form management and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Function to reset form fields
    clearErrors // Function to clear all form errors
  } = useForm<AddCategoria>({
    defaultValues: {
      nombre: "",
      descripcion: "", // Description is optional, so no 'required' rule here
    }
  });

  // Adjust useAddCategoria to no longer manage form state
  const { isPendingAdd, addCategoria, isSuccess, error } = useAddCategoria();

  // Effect to close modal and show notification on success
  useEffect(() => {
    if (isSuccess) {
      setNoti({ title: "Correcto", message: "Categoría registrada exitosamente", type: "success" });
      close(); // Close the modal
    }
    // No explicit handling for 'error' in useEffect to keep the modal open with the error message
  }, [isSuccess, setNoti]); // Depend on isSuccess and setNoti

  // onSubmit function, called by handleSubmit only if form is valid
  const onSubmit = (data: AddCategoria) => {
    // 'data' now contains the validated form values (nombre, descripcion)
    addCategoria(data); // Pass the form data directly to addCategoria
  };

  const close = () => {
    reset(); // Reset form fields to default values
    clearErrors(); // Clear any validation errors
    handleModal("categorias"); // Close the modal
  };

  return (
    <Dialog open={modal.categorias} onClose={close}> {/* Use the unified close function */}
      <DialogTitle>Registrar nueva categoría</DialogTitle>
      <DialogContent>


        {/* Display server-side error if present */}
        {error && <Alert severity="error" sx={{ my: 2 }}>{error.message}</Alert>}

        <Stack direction='column' gap={2} mt={1}>
          {isPendingAdd && <LinearProgress />}
          <TextField
            disabled={isPendingAdd}
            label="Nombre"
            fullWidth
            autoFocus
            autoComplete="off"
            {...register("nombre", {
              required: "El nombre de la categoría es obligatorio.", // Validation rule
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres."
              }
            })}
            error={!!errors.nombre} // Show error state
            helperText={errors.nombre?.message} // Display validation message
          />

          <TextField
            disabled={isPendingAdd}
            label="Descripción"
            fullWidth
            autoComplete="off"
            {...register("descripcion")} // No 'required' rule here, making it optional
          // No error/helperText props needed for 'descripcion' if there are no validation rules
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isPendingAdd}
          onClick={close} // Call the close function
          variant="outlined"
          startIcon={<Icon name="chevrons-left" />}
        >
          Cerrar
        </Button>
        <Button
          disabled={isPendingAdd}
          onClick={handleSubmit(onSubmit)} // Use handleSubmit to trigger validation and then onSubmit
          endIcon={<Icon name="device-floppy" />}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoriaModal;