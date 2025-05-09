import { ColumnConfigType } from "@/core/types/columnconfig";

export default function ColumnsFormasPago({ width }: { width: number }) {
  const columns: ColumnConfigType[] = [
    {
      label: "id",
      dataKey: "id",
      width: width * 0.04,
    },
    {
      label: "Descripcion",
      dataKey: "descripcion",
      width: width * 0.2,
    },
    {
      label: "Tipo",
      dataKey: "tipo",
      width: width * 0.2,
    },
    {
      label: "Porcentaje",
      dataKey: "porcentaje_descuento",
      width: width * 0.2,
    },
    {
      label: "Activo",
      dataKey: "activo",
      width: width * 0.2,
    },
  ];
  return columns;
}
