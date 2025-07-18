import Icon from "@/components/ui/icon";
import useThemeCustom from "@/hooks/useThemeCustom";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

interface CardHomeProps {
    data: number | string;
    title: string;
    icon?: string;
    color?: string;
    caption?: string;
    captionIcon?: string;
    captionColor?: string;
}

function CardEstadistica({ data, title, icon, color, caption, captionIcon, captionColor }: CardHomeProps) {
    const { customTheme } = useThemeCustom();
    return (
        <Card sx={{ boxShadow: 4 }}>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="caption">{title}</Typography>
                        <Typography variant="h5">{data}</Typography>
                        <Typography variant="caption">{caption}</Typography>{" "}
                        {captionIcon && (
                            <Icon name={captionIcon} size={14} color={captionColor} />
                        )}
                    </Box>
                    {icon && <Icon name={icon} color={color ?? customTheme?.palette.primary.main} size={36} />}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CardEstadistica;
