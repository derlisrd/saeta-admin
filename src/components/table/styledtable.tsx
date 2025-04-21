import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledTableContainer = styled(Box)(({ theme }) => ({
  "& .ReactVirtualized__Table__headerRow": {
    borderRadius: "12px",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  "& .ReactVirtualized__Table__row": {
    padding: "0 14px",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
      borderRadius: "12px",
    },
  },
}));

export default StyledTableContainer;
