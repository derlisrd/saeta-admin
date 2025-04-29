import useClientes from "@/core/hooks/clientes/useClientes";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Container, LinearProgress, Stack, Button, Box, Slide, TextField, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericTable from "@/components/table/GenericTable";
import TableCellRender from "./_components/tablecellrender";
import TableHeaderRender from "./_components/tableheaderrender";
import { ClienteResults } from "@/services/dto/clientes/cliente";
import { useState } from "react";
import Icon from "@/components/ui/icon";

const getColumnConfig = (width: number): ColumnConfigType[] => [
  { dataKey: "id", label: "ID", width: width * 0.1 },
  { dataKey: "doc", label: "Doc", width: width * 0.15 },
  { dataKey: "razon_social", label: "Razón social", width: width * 0.3 },
  { dataKey: "telefono", label: "Tel.", width: width * 0.13 },
  { dataKey: "extranjero", label: "Extranjero", width: width * 0.13 },
  /*   {
    dataKey: "created_at",
    label: "Registro",
    width: width * 0.15,
    cellRenderer: ({ rowData }: TableCellProps) => (rowData.created_at ? format(rowData.created_at, "DD-MM-YY HH:mm") : ""),
  }, */
  { dataKey: "_", label: "Acciones", width: width * 0.18 },
];

const columns = (width: number): ColumnConfigType[] =>
  getColumnConfig(width).map((config) => ({
    ...config,
    headerRenderer: TableHeaderRender,
    cellRenderer: config.cellRenderer || TableCellRender,
  }));

function Clientes() {
  const nav = useNavigate();
  const { isLoading, lista } = useClientes();
  const [search, setSearch] = useState("");

  const listado = lista ? lista.filter((item: ClienteResults) => item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search)) : [];

  return (
    <Container>
      <Stack spacing={2} my={2} direction="row">
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
        <Button size="small" startIcon={<Icon>user-plus</Icon>} onClick={() => nav("/clientes/add")}>
          Registrar
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            <GenericTable data={listado} columns={columns(window.innerWidth)} rowHeight={40} headerHeight={36} />
          </Box>
        </Slide>
      )}
    </Container>
  );
}

export default Clientes;
