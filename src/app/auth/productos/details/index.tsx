import {
    Container,
    Grid,
    Box,
    Typography,
    Breadcrumbs,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Images from "./images";
import { ProductoResults } from "@/services/dto/productos/producto";



function Details() {
    //const { id } = useParams();
    const location = useLocation();
    const { producto } = location.state || {};
    const [selectedImage, setSelectedImage] = useState<string>(producto?.images?.[0]?.url || "");

    const productData: ProductoResults = producto

    if (!productData) {
        return (
            <Container>
                <Typography variant="h6">Producto no encontrado.</Typography>
            </Container>
        );
    }


    return (
        <Container sx={{ mt: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs separator="›">
                    <Typography variant="overline">Producto</Typography>
                    <Typography variant="overline">{productData.nombre}</Typography>
                </Breadcrumbs>
            </Box>
            <Grid container spacing={4}>

                <Grid size={{ xs: 12, sm: 6 }}>
                    {
                        productData.images.length > 0 && <Images selectedImage={selectedImage} productData={productData} setSelectedImage={setSelectedImage} />
                    }
                </Grid>

                {/* Product Details Section */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ p: 2 }}>

                        <Typography variant="h4" component="h1" gutterBottom>
                            {productData.nombre}
                        </Typography>
                        <Typography>
                            Precio: {productData.precio_normal.toLocaleString('es-PY')}
                        </Typography>
                        <Typography>
                            Mínimo: {(productData.precio_minimo).toLocaleString('es-PY')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            {productData.descripcion}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Details;