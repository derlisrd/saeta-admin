import Box from "@mui/material/Box";

export default function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        height: 48,
        paddingLeft: 1
      }}
    >
      {children}
    </Box>
  );
}
