import GenericTable from '@/components/table/GenericTable';
import { ProductoMasVendido } from '@/services/dto/estadisticas/productos';
import { Box } from '@mui/material'

interface ProductosMasVendidosProps {
    data: ProductoMasVendido[];
}

function ProductosMasVendidosLista({ data }: ProductosMasVendidosProps) {
    const width = window.innerWidth
    const columns = [
        {
            dataKey: "codigo",
            label: "Codigo",
            width: width * 0.1,
        },
        {
            dataKey: "nombre",
            label: "Producto",
            width: width * 0.3,
        },

        {
            dataKey: "cantidad_total_vendido",
            label: "Cantidad",
            width: width * 0.15,
        },
        {
            dataKey: "ingresos_total",
            label: "Ingresos",
            width: width * 0.15,
        },
        {
            dataKey: "lucro_total",
            label: "Lucro",
            width: width * 0.15,
        },
    ];

    return <Box mt={2}>
        <GenericTable data={data} columns={columns} headerHeight={36} rowHeight={36} />
    </Box>
}

export default ProductosMasVendidosLista;