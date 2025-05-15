import { Button, DialogTitle, IconButton, Stack, Tooltip, Typography, Zoom } from "@mui/material";
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
              <Icon size={36}>arrow-left-dashed</Icon>
            </IconButton>
          </Tooltip>
          <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' } }}>Pedido | Total: {pedidos[index].total.toLocaleString('es-PY')} Gs</Typography>
        </Stack>
        <Button
          onClick={() => {
            handleModal("clientes");
          }}
          size="small"
          startIcon={<Icon>user-plus</Icon>}
        >
          {pedidos[index].cliente_id === 0 ? "Agregar Cliente" : pedidos[index].cliente}
        </Button>
      </Stack>
    </DialogTitle>
  );
}

export default Title;
