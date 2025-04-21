import { Box } from "@mui/material";
import { TableCellProps } from "react-virtualized";

export default function TableCellRender({ cellData }: TableCellProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        height: 48,
        fontSize: 13,
        paddingLeft: 1,
      }}
    >
      {cellData}
    </Box>
  );
}
