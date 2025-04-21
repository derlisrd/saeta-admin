import useImpresoras from "@/core/hooks/config/useImpresoras";
import { Box, Button, Container, LinearProgress, Paper, Table, TableContainer, TableHead, Typography, TableRow, TableCell, TableBody } from "@mui/material";
import AddModalImpresora from "./_modal/add";
import { useState } from "react";

function Impresoras() {
  const { lista, isLoading } = useImpresoras();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => setModalOpen(!modalOpen);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <h3>Impresoras</h3>
        <Button variant="contained" color="primary" onClick={handleModal}>
          Agregar Impresora
        </Button>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <LinearProgress />
        </Box>
      ) : !lista || lista.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">No hay impresoras registradas</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Milímetros</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map((impresora) => (
                <TableRow key={impresora.id}>
                  <TableCell>{impresora.id}</TableCell>
                  <TableCell>{impresora.nombre}</TableCell>
                  <TableCell>{impresora.mm}</TableCell>
                  <TableCell>{impresora.activo ? "Activo" : "Inactivo"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddModalImpresora open={modalOpen} onClose={handleModal} />
    </Container>
  );
}

export default Impresoras;
