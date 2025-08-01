import { Box } from "@mui/material";
import { APP_IMAGE_BASE } from "@/constants/config";
import { ProductoResults } from "@/services/dto/productos/producto";
import { Dispatch, Key, SetStateAction } from "react";

interface IImageProps {
    selectedImage: string;
    setSelectedImage: Dispatch<SetStateAction<string>>
    productData: ProductoResults
}

export default function Images({ selectedImage, productData, setSelectedImage }: IImageProps) {
    return <>
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
    </>
}

