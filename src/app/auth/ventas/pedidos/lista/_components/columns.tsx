


const handleImprimir = (pedido: PedidosDelDiaResults) => {
    setSelectedRow(pedido);
    setModals({ ...modals, imprimir: true });
};


const columns = (width: number): ColumnConfigType[] =>
    pedidosColumnConfig(width, handleImprimir).map((config) => ({
        ...config,
        headerRenderer: TableHeadRender,
        cellRenderer: config.cellRenderer || TableCellRender,
    }));

export default columns;
