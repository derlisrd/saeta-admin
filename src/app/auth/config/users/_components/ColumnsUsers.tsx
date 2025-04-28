import { ColumnConfigType } from "@/core/types/columnconfig";

export default function ColumnsUsers({ width }: { width: number }) {
  const columns: ColumnConfigType[] = [
    {
      label: "id",
      dataKey: "id",
      width: width * 0.2,
    },
    {
      label: "Nombre",
      dataKey: "name",
      width: width * 0.2,
    },
    {
      label: "Usuario",
      dataKey: "username",
      width: width * 0.2,
    },
    {
      label: "Sucursal",
      dataKey: "sucursal_id",
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
