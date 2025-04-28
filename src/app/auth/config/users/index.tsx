import GenericTable from "@/components/table/GenericTable";
import useUsers from "@/core/hooks/users/useUsers";
import { Box, Button, Container, LinearProgress, Stack } from "@mui/material";
import ColumnsUsers from "./_components/columnsUsers";

function Users() {
  const { data, isLoading } = useUsers();

  return (
    <Container>
      <Stack spacing={2} mt={2} py={1} direction="row" justifyContent="space-between">
        <h3>Usuarios</h3>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Nuevo
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <GenericTable data={data} columns={ColumnsUsers({ width: window.innerWidth })} rowHeight={40} headerHeight={36} />
        </Box>
      )}
    </Container>
  );
}

export default Users;
