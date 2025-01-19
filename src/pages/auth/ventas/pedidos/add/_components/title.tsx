import { DialogTitle, Icon, IconButton, Link, Stack, Tooltip, Typography, Zoom } from "@mui/material";
import useHook from "../useHook";

function Title() {
  const { handleModal, pedidos, index } = useHook();
  return (
    <DialogTitle>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction={{ xs: "row" }} alignItems="center">
          <Tooltip title="Volver" slots={{ transition: Zoom }} arrow placement="right-start">
            <IconButton
              onClick={() => {
                handleModal("main", false);
              }}
              color="primary"
            >
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>
          <Typography variant="body1">Pedido | Total: {pedidos[index].total} Gs</Typography>
        </Stack>
        <Link
          component="button"
          variant="overline"
          onClick={() => {
            handleModal("clientes", true);
          }}
        >
          {pedidos[index].cliente_id === 0 ? "Seleccionar Cliente" : "Cambiar Cliente"}
        </Link>
      </Stack>
    </DialogTitle>
  );
}

export default Title;
