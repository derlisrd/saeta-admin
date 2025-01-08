import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

function BoxShadow({ children }: { children?: ReactNode }) {
  return (
    <Box boxShadow={6} borderRadius={8} padding={2} component={Paper}>
      {children}
    </Box>
  );
}

export default BoxShadow;
