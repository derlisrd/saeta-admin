// components/table/GenericTable.tsx
import { ColumnConfigType } from "@/core/types/columnconfig";
import { Table, Column, TableHeaderProps, TableCellProps } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import TableCellHead from "@/components/table/tablecellhead";
import TableCell from "@/components/table/tablecell";
import StyledTableContainer from "@/components/table/styledtable";
import { SxProps, Theme } from "@mui/material";

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfigType[];
  rowHeight?: number;
  headerHeight?: number;
  sx?: SxProps<Theme>;
}

const defaultHeaderRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const defaultCellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

function GenericTable<T extends object>({ data, columns, rowHeight = 48, headerHeight = 48, sx }: GenericTableProps<T>) {
  return (
    <StyledTableContainer sx={{ borderRadius: 1, border: 0, boxShadow: 0, minHeight: `calc(100% - ${headerHeight + 128}px)`, ...sx }}>
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
    </StyledTableContainer>
  );
}

export default GenericTable;
