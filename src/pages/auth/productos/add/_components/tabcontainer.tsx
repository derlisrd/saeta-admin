import { Box } from "@mui/material";

interface TabContainerProps {
  children: React.ReactNode;
  index: number;
  tabValue: number;
}

function TabContainer({ children, index, tabValue }: TabContainerProps) {
  return (
    <div role="tabpanel" hidden={tabValue !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
      {tabValue === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default TabContainer;
