import { TableHeaderProps } from "react-virtualized";
import { Box } from "@mui/material";

const TableHeadRender = ({ label }: TableHeaderProps) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      cursor: "pointer",
      height: 48,
      padding: "0 0 0 14px",
    }}
  >
    {label}
  </Box>
);

export default TableHeadRender;
