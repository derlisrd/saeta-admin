import { AddProducto } from "@/services/dto/productos/AddProducto";
import { Container, Grid, IconButton, Card, CardMedia, Typography, Box } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Icon from "@/components/ui/icon";

function Imagenes() {
  const { setForm, form } = useAddProducto();

  // Función para comprimir imágenes
  const compressImages = async (files: File[]) => {
    const compressedImages: File[] = [];

    for (const file of files) {
      const options = {
        maxSizeMB: 0.5, // Máximo 500 KB por imagen
        maxWidthOrHeight: 1280, // Redimensionar si es más grande
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        compressedImages.push(new File([compressedFile], file.name, { type: compressedFile.type }));
      } catch (error) {
        console.error("Error al comprimir la imagen:", error);
      }
    }

    return compressedImages;
  };

  // Función de subida de imágenes
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const compressedFiles = await compressImages(acceptedFiles);
      setForm((prev) => new AddProducto({ ...prev, images: [...(prev.images ?? []), ...compressedFiles] }));
    },
    [setForm]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] }, // Solo acepta imágenes
    onDrop, // Maneja la subida aquí
  });

  // Eliminar imagen
  const removeImage = (index: number) => {
    setForm((prev) => {
      const newImages = (prev.images ?? []).filter((_, i) => i !== index);
      return new AddProducto({ ...prev, images: newImages });
    });
  };

  return (
    <Container>
      {/* Área de subida con Drag & Drop */}
      <Box {...getRootProps()} borderRadius={2} border={2} padding={3} sx={{ borderStyle: "dashed", cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Icon size={24} name='photo-up' />
        <Typography variant="h6" color="textSecondary">
          {isDragActive ? "Suelta las imágenes aquí..." : "Arrastra y suelta imágenes aquí o haz clic para seleccionar"}
        </Typography>
      </Box>

      {/* Vista previa de imágenes */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {form.images &&
          form.images.map((image, index) => (
            <Grid size={{ xs: 12, sm: 4, md: 2, lg: 2 }} key={index}>
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
                  <Icon name='trash' />
                </IconButton>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Imagenes;
