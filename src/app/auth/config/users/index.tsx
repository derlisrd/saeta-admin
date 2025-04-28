import GenericTable from "@/components/table/GenericTable";
import useUsers from "@/core/hooks/users/useUsers";
import { Box, Button, Container, LinearProgress, Stack } from "@mui/material";
import ColumnsUsers from "./_components/ColumnsUsers";
import { useState } from "react";
import AddUsersModal from "./_modals/AddUsersModal";

function Users() {
  const { data, isLoading } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => setModalOpen(!modalOpen);

  return (
    <Container>
      <Stack spacing={2} mt={2} py={1} direction="row" justifyContent="space-between">
        <h3>Usuarios</h3>
        <Button onClick={handleModal}>Nuevo</Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <GenericTable data={data ? data : []} columns={ColumnsUsers({ width: window.innerWidth })} rowHeight={40} headerHeight={36} />
        </Box>
      )}
      <AddUsersModal open={modalOpen} onClose={handleModal} />
    </Container>
  );
}

export default Users;
