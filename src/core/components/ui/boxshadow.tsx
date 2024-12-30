import { Box } from "@mui/material";
import { ReactNode } from "react";

function BoxShadow({ children }: { children?: ReactNode }) {
  return (
    <Box maxWidth="lg" marginTop={3} borderRadius={3} padding={2} boxShadow="7px 6px 8px 1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 3px 3px 3px 0px rgb(0 0 0 / 12%)">
      {children}
    </Box>
  );
}

export default BoxShadow;
