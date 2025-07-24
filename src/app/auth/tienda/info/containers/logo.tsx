import { Button, Card, CardActions, CardContent, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { useOptionsProvider } from "../../provider";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import Icon from "@/components/ui/icon";
import { config } from "@/constants/config";



export default function Logo() {
    const { options, isPending, updateInfoOption, setNoti } = useOptionsProvider();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const logoOption = options.find(option => option.key === "logo");

    useEffect(() => {
        if (logoOption && logoOption.value) {
            setLogoPreview(logoOption.value);
        } else {
            setLogoPreview(null);
        }
    }, [logoOption]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            setSelectedFile(null);
            setLogoPreview(logoOption?.value || null);
            setFileError("No se seleccionó ningún archivo.");
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            setSelectedFile(null);
            setLogoPreview(logoOption?.value || null);
            setFileError("El archivo debe ser JPG o PNG.");
            return;
        }

        const maxSize = 1 * 1024 * 1024; // 1MB
        if (file.size > maxSize) {
            setSelectedFile(null);
            setLogoPreview(logoOption?.value || null);
            setFileError("El tamaño del archivo no debe exceder 1MB.");
            return;
        }

        setSelectedFile(file);
        setFileError(null);

        const fileUrl = URL.createObjectURL(file);
        setLogoPreview(fileUrl);
    };

    // FUNCIÓN MODIFICADA PARA USAR FETCH CON LA API REST DE SUPABASE STORAGE
    const uploadFileToSupabaseWithFetch = async (file: File): Promise<string> => {
        const bucketName = 'logos'; // Tu bucket de Supabase Storage

        // Genera un nombre de archivo único para evitar colisiones
        const fileExtension = file.name.split('.').pop();
        // Usamos un UUID (si tienes una librería) o un timestamp + aleatorio
        // Para este ejemplo, un timestamp + aleatorio es suficiente
        const fileName = `${Date.now()}.${fileExtension}`;
        const filePath = `${fileName}`; // Ruta dentro del bucket (ej: "1701234567-abcdef.png")

        const uploadUrl = `${config.SUPABASE_URL}/storage/v1/object/${bucketName}/${filePath}`;

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    // Si usas tu API Key directamente para autenticación anónima
                    'apikey': config.SUPABASE_ANON_KEY,
                    // Si tienes un token JWT de un usuario autenticado de Supabase
                    'Authorization': `Bearer ${config.SUPABASE_ANON_KEY}`,
                    // El Content-Type es importante para FormData
                    'Content-Type': file.type, // El tipo MIME del archivo
                    // 'x-upsert': 'true', // Opcional: Para sobrescribir si el archivo ya existe
                },
                body: file, // Envía el objeto File directamente como cuerpo
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al subir el archivo: ${errorData.message || response.statusText}`);
            }

            // La API de Supabase Storage devuelve un JSON con { "Key": "bucket/path/file.png" }
            const result = await response.json();
            console.log('Respuesta de Supabase Storage:', result);

            // Construye la URL pública del archivo
            const publicUrl = `${config.SUPABASE_URL}/storage/v1/object/public/${bucketName}/${filePath}`;

            console.log("URL pública del archivo subido:", publicUrl);
            return publicUrl;

        } catch (error: any) {
            console.error("Error en la subida con fetch:", error);
            throw new Error(`Falló la subida del archivo: ${error.message}`);
        }
    };


    const enviar = async () => {
        setFileError(null);

        let logoUrlToSave: string | null = logoOption?.value || null;

        if (selectedFile) {
            setIsUploading(true);
            try {
                const uploadedUrl = await uploadFileToSupabaseWithFetch(selectedFile);
                logoUrlToSave = uploadedUrl;

                setNoti({
                    title: "Éxito",
                    message: "Logo subido correctamente.",
                    type: "success",
                    icon: "check-circle",
                });

            } catch (error: any) {
                console.error("Error en la subida y obtención de URL:", error);
                setFileError(`Error al subir el logo: ${error.message}`);
                setNoti({
                    title: "Error",
                    message: "No se pudo subir el logo: " + error.message,
                    type: "error",
                    icon: "error"
                });
                setIsUploading(false);
                return;
            } finally {
                setIsUploading(false);
            }
        } else if (!selectedFile && !logoOption?.value) {
            setFileError("No hay un nuevo logo seleccionado para subir.");
            return;
        }

        updateInfoOption({
            key: "logo",
            value: logoUrlToSave || "",
            json: 0
        });

        setSelectedFile(null);
    };

    const handleLogoClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Card sx={{ borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6">
                    Logo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Agrega un logo para tu tienda
                </Typography>

                <Box
                    sx={{
                        width: 120,
                        height: 120,
                        border: '1px dashed #ccc',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        position: 'relative',
                        bgcolor: 'background.default',
                        '&:hover': {
                            borderColor: 'primary.main',
                        },
                    }}
                    onClick={handleLogoClick}
                >
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    {isUploading ? (
                        <CircularProgress size={40} />
                    ) : logoPreview ? (
                        <img
                            src={logoPreview}
                            alt="Logo de la tienda"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <IconButton
                            color="inherit"
                            aria-label="upload picture"
                            component="span"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                '& .MuiSvgIcon-root': {
                                    fontSize: '2rem',
                                },
                            }}
                        >
                            <Icon name="photo-plus" />
                        </IconButton>
                    )}
                </Box>

                {fileError && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {fileError}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'background.default',
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
            }}>
                <Typography variant="body2" color="text.secondary">
                    Recomendado 300x200px
                </Typography>
                <Button
                    disabled={isPending || isUploading || (!selectedFile && !logoOption?.value)}
                    onClick={enviar}
                >
                    Guardar cambios
                </Button>
            </CardActions>
        </Card>
    );
}