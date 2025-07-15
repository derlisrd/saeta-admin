import {
    Container,
    Grid,
    Box,
    Typography,
    Rating,
    Breadcrumbs,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Key, useState } from "react";
import { APP_IMAGE_BASE } from "@/constants/config";


function Details() {
    //const { id } = useParams();
    const location = useLocation();
    const { producto } = location.state || {};
    const [selectedImage, setSelectedImage] = useState(
        producto?.images?.[0]?.url || ""
    );

    const productData = producto

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
                {/* Product Image Section */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            pt: "75%", // 4:3 aspect ratio
                            overflow: "hidden",
                            borderRadius: 2,
                            boxShadow: 1,
                        }}
                    >
                        <img
                            src={APP_IMAGE_BASE + (selectedImage || productData.images?.[0]?.url)}
                            alt={productData.nombre}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            mt: 2,
                            overflowX: "auto",
                            pb: 1, // Add padding for scrollbar
                        }}
                    >
                        {productData.images.map((image: { id: Key | null | undefined; url: any; miniatura: string | undefined; }) => (
                            <Box
                                key={image.id}
                                sx={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 1,
                                    overflow: "hidden",
                                    border:
                                        selectedImage === image.url
                                            ? "2px solid primary.main"
                                            : "1px solid #ddd",
                                    cursor: "pointer",
                                    flexShrink: 0, // Prevent shrinking
                                }}
                                onClick={() => setSelectedImage(image.url)}
                            >
                                <img
                                    src={APP_IMAGE_BASE + image.miniatura}
                                    alt={`Thumbnail ${image.id}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Grid>

                {/* Product Details Section */}
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ p: 2 }}>
                        <Box
                            sx={{
                                bgcolor: "success.main",
                                color: "white",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                display: "inline-block",
                                mb: 1,
                            }}
                        >
                            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                                In Stock
                            </Typography>
                        </Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {productData.nombre}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                (9911 reviews)
                            </Typography>
                        </Box>
                        <Typography
                            variant="h5"
                            component="p"
                            sx={{ fontWeight: "bold", mb: 1 }}
                        >
                            ${productData.precio_normal.toFixed(2)}{" "}
                            <Typography
                                component="span"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                    ml: 1,
                                }}
                            >
                                ${(productData.precio_normal * 1.16).toFixed(2)}
                            </Typography>{" "}
                            {/* Example of old price */}
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