import useClientes from "@/core/hooks/clientes/useClientes";

import { ColumnConfigType } from "@/core/types/columnconfig";
import { Container, LinearProgress, Stack, Button, Box } from "@mui/material";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { useNavigate } from "react-router-dom";
import GenericTable from "@/components/table/GenericTable";
import TableCellRender from "./_components/tablecellrender";
import TableHeaderRender from "./_components/tableheaderrender";
import { ClienteResults } from "@/services/dto/clientes/cliente";
import { useState } from "react";

const getColumnConfig = (width: number): ColumnConfigType[] => [
  { dataKey: "id", label: "ID", width: width * 0.1 },
  { dataKey: "doc", label: "Doc", width: width * 0.15 },
  { dataKey: "razon_social", label: "Razón social", width: width * 0.3 },
  { dataKey: "telefono", label: "Tel.", width: width * 0.13 },
  { dataKey: "extranjero", label: "Extranjero", width: width * 0.13 },
  { dataKey: "created_at", label: "Registro", width: width * 0.15, cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MM-YY HH:mm") },
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
  const [search] = useState("");

  const listado = lista ? lista.filter((item: ClienteResults) => item.razon_social.toLowerCase().includes(search.toLowerCase()) || item.doc.includes(search)) : [];

  return (
    <Container>
      <Stack spacing={2} mt={2} py={1} direction="row" justifyContent="space-between">
        <h3>Clientes</h3>
        <Button variant="contained" color="primary" onClick={() => nav("/clientes/add")}>
          Nuevo
        </Button>
      </Stack>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box>
          <GenericTable data={listado} columns={columns(window.innerWidth)} rowHeight={40} headerHeight={36} />
        </Box>
      )}
    </Container>
  );
}

export default Clientes;
