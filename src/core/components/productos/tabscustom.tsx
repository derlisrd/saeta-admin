import { Box, Tabs, Tab } from "@mui/material";

interface TabsCustomProps {
    tabValue: number;
    setTabValue: React.Dispatch<React.SetStateAction<number>>
}

function TabsCustom({ tabValue, setTabValue }: TabsCustomProps) {
    return (
        <Box sx={{ pb: 1, borderColor: "divider" }}>
            <Tabs
                value={tabValue}
                onChange={(_, value) => {
                    setTabValue(value);
                }}
            >
                <Tab label="Datos" tabIndex={0} />
                <Tab label="Imágenes" tabIndex={1} />
                <Tab label="Atributos" tabIndex={2} />
            </Tabs>
        </Box>
    );
}

export default TabsCustom;
