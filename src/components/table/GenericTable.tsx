// components/table/GenericTable.tsx
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Table, Column, TableHeaderProps, TableCellProps, ColumnProps } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import TableCellHead from "@/components/table/tablecellhead";
import TableCell from "@/components/table/tablecell";
import StyledTableContainer from "@/components/table/styledtable";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import Icon from "../ui/icon";

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfigType[] | ColumnProps[];
  rowHeight?: number;
  headerHeight?: number;
  sx?: SxProps<Theme>;
  minHeight?: number;
  dataTextNull?: string;
}

const defaultHeaderRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const defaultCellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

function GenericTable<T extends object>({ data, dataTextNull = 'No hay datos', columns, rowHeight = 48, headerHeight = 48, sx, minHeight = 190 }: GenericTableProps<T>) {
  return (
    <StyledTableContainer sx={{ minHeight: `calc(100% - ${headerHeight + minHeight}px)`, ...sx }}>
      {data && (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={rowHeight!}
              headerHeight={headerHeight!}
              rowStyle={{ display: "flex", alignItems: "center" }}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
            >
              {columns.map((column) => (
                <Column
                  key={column.dataKey}
                  headerRenderer={column.headerRenderer || defaultHeaderRenderer}
                  cellRenderer={column.cellRenderer || defaultCellRenderer}
                  dataKey={column.dataKey}
                  label={column.label}
                  width={Number(column.width)}
                />
              ))}

            </Table>
          )}
        </AutoSizer>
      )}
      {data.length === 0 && <Box sx={{
        minHeight: `calc(100% - ${headerHeight + minHeight}px)`, display: "flex",
        justifyContent: "center", alignItems: "center", gap: 2, flexDirection: "column"
      }}>
        <Icon name="database" size={24} />
        <Typography>{dataTextNull}</Typography>
      </Box>}
    </StyledTableContainer>
  );
}

export default GenericTable;
