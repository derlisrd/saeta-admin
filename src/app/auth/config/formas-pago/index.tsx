import GenericTable from "@/components/table/GenericTable";
import Icon from "@/components/ui/icon";
import useFormasPago from "@/core/hooks/config/useFormasPago";
import { Box, Button, Container, InputAdornment, LinearProgress, Slide, Stack, TextField } from "@mui/material";
import { useState } from "react";

function FormasPago() {
  const [search, setSearch] = useState("");

  const { isLoading } = useFormasPago();

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
        <Button startIcon={<Icon>cards</Icon>} onClick={() => {}}>
          Agregar
        </Button>
        <Button onClick={() => {}} startIcon={<Icon>refresh</Icon>}>
          Refrescar
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <Box>
            <GenericTable data={[]} columns={[]} rowHeight={40} headerHeight={36} />
          </Box>
        </Slide>
      )}
    </Container>
  );
}

export default FormasPago;
