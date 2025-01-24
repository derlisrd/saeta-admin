import { AddProducto } from "@/services/dto/productos/AddProducto";
import { Container, Grid2 as Grid, Button, Icon, IconButton, Card, CardMedia } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";

function Imagenes() {
  const { setForm, form } = useAddProducto();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedImages = Array.from(event.target.files);

    setForm((prev) => new AddProducto({ ...prev, images: [...(prev.images ?? []), ...selectedImages] }));
  };

  const removeImage = (index: number) => {
    const copyForm = { ...form };
    const images = copyForm.images ?? [];
    const newImages = images.filter((_, i) => i !== index);
    setForm((prev) => new AddProducto({ ...prev, images: newImages }));
  };
  return (
    <Container>
      {/* Botón de subida */}
      <Button variant="contained" component="label" startIcon={<Icon>add</Icon>}>
        Subir Imágenes
        <input type="file" multiple accept="image/*" hidden onChange={handleImageUpload} />
      </Button>

      {/* Vista previa de imágenes */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {form.images &&
          form.images.map((image, index) => (
            <Grid size={{ xs: 12, sm: 4, md: 2, lg: 1 }} key={index}>
              <Card sx={{ position: "relative" }}>
                <CardMedia component="img" height="100" image={URL.createObjectURL(image)} alt={`Imagen ${index}`} />
                {/* Botón para eliminar */}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                  size="small"
                  onClick={() => removeImage(index)}
                >
                  <Icon>delete</Icon>
                </IconButton>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Imagenes;
