import TableCell from "@/components/table/tablecell";
import { TableCellProps } from "react-virtualized";

export default function TableCellRender({ cellData }: TableCellProps) {
  return <TableCell>{cellData}</TableCell>;
}
