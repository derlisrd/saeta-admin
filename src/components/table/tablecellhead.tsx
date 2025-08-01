import Box from "@mui/material/Box";

export default function TableCellHead({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        height: 48,
        backgroundColor: "primary.main",
        padding: "0 0 0 14px",
        color: "#fff",
      }}
    >
      {children}
    </Box>
  );
}
