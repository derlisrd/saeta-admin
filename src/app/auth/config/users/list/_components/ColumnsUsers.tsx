import Icon from "@/components/ui/icon";
import { ColumnConfigType } from "@/core/types/columnconfig";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { UserListResults } from "@/services/dto/users/user";
import { TableCellProps } from "react-virtualized";
import { modalsType } from "../provider";

export default function ColumnsUsers(setSelectedUser: React.Dispatch<React.SetStateAction<UserListResults | null>>, handleModals: (modalName: keyof modalsType) => void) {
  const width = window.innerWidth;

  const Acciones = (rowData: UserListResults) => (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Seleccionar">
        <IconButton
          onClick={() => {
            setSelectedUser(rowData);
            handleModals("permisos");
          }}
        >
          <Icon name="key" />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  const columns: ColumnConfigType[] = [
    {
      label: "id",
      dataKey: "id",
      width: width * 0.04,
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
    {
      label: "Acciones",
      dataKey: "_",
      width: width * 0.2,
      cellRenderer: ({ rowData }: TableCellProps) => <Acciones {...rowData} />,
    },
  ];
  return columns;
}


