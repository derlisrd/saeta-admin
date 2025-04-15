import TableCell from "@/components/table/tablecell";
import TableCellHead from "@/components/table/tablecellhead";
import useClientes from "@/core/hooks/clientes/useClientes";
import AutoSizer from "react-virtualized-auto-sizer";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Container, LinearProgress, Box, TableContainer, Paper, Stack, Button } from "@mui/material";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { useNavigate } from "react-router-dom";
import StyledTableContainer from "@/components/table/styledtable";

const getColumnConfig = (width: number): ColumnConfigType[] => [
  { dataKey: "id", label: "ID", width: width * 0.1 },
  { dataKey: "doc", label: "Doc", width: width * 0.15 },
  { dataKey: "razon_social", label: "Razón social", width: width * 0.3 },
  { dataKey: "telefono", label: "Tel.", width: width * 0.13 },
  { dataKey: "extranjero", label: "Extranjero", width: width * 0.13 },
  { dataKey: "created_at", label: "Registro", width: width * 0.15, cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MM-YY HH:mm") },
  { dataKey: "_", label: "Acciones", width: width * 0.18 },
];

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

function Clientes() {
  const nav = useNavigate();
  const { isLoading, lista } = useClientes();
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
        <Box boxShadow={3} borderRadius={4} component={Paper}>
          <StyledTableContainer sx={{ borderRadius: 1, border: 0, boxShadow: 0, minHeight: `calc(100% - 140px)` }}>
            {lista && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={48!}
                    headerHeight={48!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={lista.length}
                    rowGetter={({ index }) => lista[index]}
                  >
                    {getColumnConfig(width).map((column) => (
                      <Column
                        key={column.dataKey}
                        headerRenderer={headerRenderer}
                        cellRenderer={column.cellRenderer || cellRenderer}
                        dataKey={column.dataKey}
                        label={column.label}
                        width={Number(column.width)}
                      />
                    ))}
                  </Table>
                )}
              </AutoSizer>
            )}
          </StyledTableContainer>
        </Box>
      )}
    </Container>
  );
}

export default Clientes;
