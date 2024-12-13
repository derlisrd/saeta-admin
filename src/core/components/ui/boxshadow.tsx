import { Box } from "@mui/material";
import { ReactNode } from "react";

function BoxShadow({ children }: { children?: ReactNode }) {
  return <Box>{children}</Box>;
}

export default BoxShadow;
