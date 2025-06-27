import { Button, DialogTitle, IconButton, Stack, Tooltip, Zoom } from "@mui/material";
import useHook from "../_hooks/useHook";
import useModal from "../_hooks/useModal";
import Icon from "@/components/ui/icon";

function Title() {
  const { pedidos, index } = useHook();
  const { handleModal } = useModal();
  return (
    <DialogTitle>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction={{ xs: "row" }} alignItems="center">
          <Tooltip title="Volver" slots={{ transition: Zoom }} arrow placement="right-start">
            <IconButton
              onClick={() => {
                handleModal("main");
              }}
              color="primary"
            >
              <Icon size={36} name="arrow-left-dashed" />
            </IconButton>
          </Tooltip>
        </Stack>
        <Button
          onClick={() => handleModal("clientes")}
          size="small"
          variant={pedidos[index].cliente_id === 0 ? "contained" : "outlined"}
          startIcon={<Icon name='user-plus' />}
        >
          {pedidos[index].cliente_id === 0 ? "Seleccionar Cliente" : pedidos[index].cliente}
        </Button>
      </Stack>
    </DialogTitle>
  );
}

export default Title;
