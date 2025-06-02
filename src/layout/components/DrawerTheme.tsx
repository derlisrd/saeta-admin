import Icon from "@/components/ui/icon";
import { Drawer, Box, Chip, Grid2 as Grid, IconButton, Button, Switch, Stack, Typography, Tooltip } from "@mui/material";
import { availableColors } from "@/theme/colors";
import useThemeCustom from "@/hooks/useThemeCustom";


interface ThemeDrawerLayoutProps {
    isOpen: boolean;
    handleIsOpen: () => void;
}
function DrawerTheme({ isOpen, handleIsOpen }: ThemeDrawerLayoutProps) {

    const { changeColor, toggleModeDark, modeDark, checkTheme } = useThemeCustom();

    const refresh = () => checkTheme(true);
    const abrirPantallaCompleta = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    return (
        <Drawer
            anchor="right"
            variant="temporary"
            closeAfterTransition
            open={isOpen}
            onClose={handleIsOpen}
            sx={{
                "& .MuiDrawer-paper": { bosmizing: "border-box", width: 280 },
            }}
        >
            <Stack p={2} direction="column">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Configuración </Typography>
                    <Stack direction="row">
                        <Tooltip placement="bottom" arrow title="Pantalla completa">
                            <IconButton onClick={abrirPantallaCompleta}>
                                <Icon>maximize</Icon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="bottom" arrow title="Restablecer">
                            <IconButton onClick={refresh}>
                                <Icon>refresh</Icon>
                            </IconButton>
                        </Tooltip>
                        <IconButton onClick={handleIsOpen}>
                            <Icon>x</Icon>
                        </IconButton>
                    </Stack>
                </Stack>
                <Box my={2}>
                    <Button variant="outlined" sx={{ backgroundColor: "background.paper" }} onClick={toggleModeDark}>
                        <Stack direction="column" spacing={1} alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Icon>sun-moon</Icon>
                                <Switch size="small" checked={!modeDark} onChange={() => { toggleModeDark(); }} />
                            </Stack>
                            <Typography variant="overline">Tema</Typography>
                        </Stack>
                    </Button>
                </Box>

                <Box>
                    <Chip label="Colores" color="primary" sx={{ p: 1 }} icon={<Icon>traffic-lights</Icon>} />
                    <Grid container spacing={2} my={1} p={1} border={1} borderColor="divider" borderRadius={2}>
                        <Grid size={6}>
                            <Chip label="Primario" color="primary" sx={{ p: 1 }} />
                        </Grid>
                        <Grid size={6}>
                            <Chip label="Secundario" color="secondary" sx={{ p: 1 }} />
                        </Grid>
                        {availableColors.map((item, i) => (
                            <Grid key={i} size={4}>
                                <IconButton
                                    sx={{ p: 1 }}
                                    onClick={() => {
                                        changeColor(item);
                                    }}
                                >
                                    <Icon size={24} color={item.color}>
                                        color-swatch
                                    </Icon>
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Drawer>
    );

}

export default DrawerTheme;