import useClientes from "@/core/hooks/clientes/useClientes";
import { Container, LinearProgress, Stack, Button, Box, Slide, TextField, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericTable from "@/components/table/GenericTable";

import { ClienteResults } from "@/services/dto/clientes/cliente";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { columnsconfig } from "./_components/columnsconfig";





function Clientes() {
  const nav = useNavigate();
  const { isLoading, lista } = useClientes();
  const [search, setSearch] = useState("");

  const listado = lista ? lista.filter((item: ClienteResults) => item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search)) : [];

  return (
    <Container>
      <Stack spacing={2} my={1} direction="row" alignItems="center">
        <TextField
          label="Buscar"
          placeholder="Nombre o documento"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name='search' />
                </InputAdornment>
              ),
            },
          }}
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button startIcon={<Icon name='users-plus' />} onClick={() => nav("/clientes/add")}>
          Registrar
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            <GenericTable data={listado} columns={columnsconfig(window.innerWidth)} rowHeight={40} headerHeight={36} />
          </Box>
        </Slide>
      )}
    </Container>
  );
}

export default Clientes;
