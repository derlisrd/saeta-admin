import GenericTable from "@/components/table/GenericTable";
import useUsers from "@/core/hooks/users/useUsers";
import { Box, Button, Container, InputAdornment, LinearProgress, Slide, Stack, TextField } from "@mui/material";
import ColumnsUsers from "./_components/ColumnsUsers";
import { useState } from "react";
import AddUsersModal from "./_modals/AddUsersModal";
import Icon from "@/components/ui/icon";
import { UserListResults } from "@/services/dto/users/user";

function Users() {
  const { data, isLoading } = useUsers();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleModal = () => setModalOpen(!modalOpen);

  const listado = data ? data.filter((item: UserListResults) => item.name.toLowerCase().includes(search.toLowerCase()) || item.username.includes(search)) : [];

  return (
    <Container>
      <Stack spacing={2} my={2} direction="row" alignItems="center">
        <TextField
          label="Buscar"
          placeholder="Nombre o documento"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            },
          }}
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button startIcon={<Icon>user-plus</Icon>} onClick={handleModal}>
          Registrar
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Box>
            <GenericTable data={listado} columns={ColumnsUsers({ width: window.innerWidth })} rowHeight={40} headerHeight={36} />
          </Box>
        </Slide>
      )}
      <AddUsersModal open={modalOpen} onClose={handleModal} />
    </Container>
  );
}

export default Users;
