import Icon from "@/components/ui/icon";
import { CreditosResults } from "@/services/dto/pedidos/creditos";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { TableCellProps } from "react-virtualized"
import { format } from "@formkit/tempo";

interface AccionesCellProps extends TableCellProps {
    rowData: CreditosResults;
}

export default function columnsListaCreditos() {
    const width = window.innerWidth

    const AccionesCell = ({ rowData }: AccionesCellProps) => (
        <Stack direction="row">
            <Tooltip title="Imprimir" placement="top" arrow>
                <IconButton onClick={() => console.log(rowData)}>
                    <Icon name='printer' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar" placement="top" arrow>
                <IconButton onClick={() => console.log("Cancelar pedido ID:", rowData.id)}>
                    <Icon name='x' />
                </IconButton>
            </Tooltip>
        </Stack>
    );

    return [
        {
            dataKey: "id",
            label: "#",
            width: width * 0.08,
        },
        {
            dataKey: "doc",
            label: "Doc",
            width: width * 0.1
        },
        {
            dataKey: "razon_social",
            label: "Cliente",
            width: width * 0.5
        },
        {
            dataKey: "monto",
            label: "monto",
            width: width * 0.1,
            cellRenderer: ({ rowData }: TableCellProps) => (
                <p>{rowData.monto.toLocaleString("es-PY")}</p>
            ),
        },
        {
            dataKey: "pedido_id",
            label: "Pedido",
            width: width * 0.1
        },
        {
            dataKey: "created_at",
            label: "Fecha",
            width: width * 0.1,
            cellRenderer: ({ rowData }: TableCellProps) => format(rowData.created_at, "DD-MM-YYYY"),
        },
        {
            dataKey: "_",
            label: "Acciones",
            width: width * 0.15,
            cellRenderer: (props: TableCellProps) => <AccionesCell {...props} />,
        },
    ]
}