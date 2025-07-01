import Icon from "@/components/ui/icon";
import { Drawer, Box, Chip, Grid, IconButton, Button, Switch, Stack, Typography, Tooltip, Slider } from "@mui/material";
import { availableColors } from "@/theme/colors";
import useThemeCustom from "@/hooks/useThemeCustom";


interface ThemeDrawerLayoutProps {
    isOpen: boolean;
    handleIsOpen: () => void;
}
function DrawerTheme({ isOpen, handleIsOpen }: ThemeDrawerLayoutProps) {

    const { toggleTheme, modeDark, checkTheme, fontSize } = useThemeCustom();

    const refresh = () => checkTheme(true);
    const abrirPantallaCompleta = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

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
                                <Icon name='maximize' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="bottom" arrow title="Restablecer">
                            <IconButton onClick={refresh}>
                                <Icon name='refresh' />
                            </IconButton>
                        </Tooltip>
                        <IconButton onClick={handleIsOpen}>
                            <Icon name='x' />
                        </IconButton>
                    </Stack>
                </Stack>
                <Box my={2}>
                    <Button variant="outlined" sx={{ backgroundColor: "background.paper", p: 2, borderRadius: 4 }} onClick={() => { toggleTheme({ toggleMode: true }) }}>
                        <Stack direction="column" spacing={1} alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Icon name='sun-moon' />
                                <Switch
                                    size="small"
                                    checked={!modeDark}
                                    onChange={() => {
                                        toggleTheme({ toggleMode: true });
                                    }}
                                />
                            </Stack>
                            <Typography variant="overline">Tema</Typography>
                        </Stack>
                    </Button>
                </Box>

                <Box>
                    <Chip label="Colores" color="primary" sx={{ p: 1 }} icon={<Icon name='traffic-lights' />} />
                    <Grid container spacing={2} my={1} p={1} border={1} borderColor="divider" borderRadius={2}>
                        <Grid size={6}>
                            <Chip label="Color 1" color="primary" sx={{ p: 1, width: "100%" }} />
                        </Grid>
                        <Grid size={6}>
                            <Chip label="Color 2" color="secondary" sx={{ p: 1, width: "100%" }} />
                        </Grid>
                        {availableColors.map((item, i) => (
                            <Grid key={i} size={4}>
                                <IconButton
                                    sx={{ p: 1 }}
                                    onClick={() => {
                                        toggleTheme({ toggleMode: false, availablecolors: item });
                                    }}
                                >
                                    <Icon name="color-swatch" size={24} color={item.color} />

                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box>
                    <Typography variant="overline">Tamaño de fuente</Typography>
                    <Slider
                        defaultValue={fontSize}
                        shiftStep={3}
                        step={1}
                        marks
                        value={fontSize}
                        min={8}
                        max={16}
                        sx={{ mt: 4 }}
                        valueLabelDisplay="on"
                        onChange={(_, value) => {

                            const nuevoFontSize = typeof value === "number" ? value : value[0]
                            toggleTheme({ toggleMode: false, size: nuevoFontSize });
                        }}
                    />
                </Box>
            </Stack>
        </Drawer>
    );

}

export default DrawerTheme;