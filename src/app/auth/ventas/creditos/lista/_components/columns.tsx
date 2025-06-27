import Icon from "@/components/ui/icon";
import { CreditosResults } from "@/services/dto/pedidos/creditos";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { TableCellProps } from "react-virtualized";
import { format } from "@formkit/tempo";
import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";

interface AccionesCellProps extends TableCellProps {
    rowData: CreditosResults;
}

// Componente memoizado para las acciones
const AccionesCell = memo(({ rowData }: AccionesCellProps) => {
    const navigate = useNavigate();

    const handleImprimir = useCallback(() => {
        console.log(rowData);
        // Aquí implementar la lógica de impresión
    }, [rowData]);

    const handleCobrar = useCallback(() => {
        navigate(`/ventas/creditos/cobrar/${rowData.id}`, {
            state: { credito: rowData }
        });
    }, [navigate, rowData]);

    return (
        <Stack direction="row" spacing={0.5}>
            <Tooltip title="Imprimir" placement="top" arrow>
                <IconButton onClick={handleImprimir} size="small">
                    <Icon name="printer" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Cobrar" placement="top" arrow>
                <IconButton onClick={handleCobrar} size="small">
                    <Icon name="wallet" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
});

export default function columnsListaCreditos() {
    const width = window.innerWidth

    return [
        {
            dataKey: "id",
            label: "#",
            width: width * 0.08,
        },
        {
            dataKey: "doc",
            label: "Doc",
            width: width * 0.12
        },
        {
            dataKey: "razon_social",
            label: "Cliente",
            width: width * 0.4
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
            dataKey: "monto_abonado",
            label: "Abonado",
            width: width * 0.1,
            cellRenderer: ({ rowData }: TableCellProps) => (
                <p>{rowData.monto_abonado.toLocaleString("es-PY")}</p>
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
            width: width * 0.12,
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