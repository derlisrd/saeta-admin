import { TableHeaderProps } from "react-virtualized";
import TableCellHead from "@/components/table/tablecellhead";

const TableHeaderRender = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;

export default TableHeaderRender;
