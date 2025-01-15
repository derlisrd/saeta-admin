import { DialogTitle, Icon, IconButton, Stack, Tooltip, Typography, Zoom } from "@mui/material";

function Title() {
  return (
    <DialogTitle>
      <Stack direction={{ xs: "row" }} alignItems="center">
        <Tooltip title="Volver" slots={{ transition: Zoom }} arrow placement="right-start">
          <IconButton onClick={() => {}} color="primary">
            <Icon>arrow_back_ios_new</Icon>
          </IconButton>
        </Tooltip>
        <Typography variant="body1">Pedido | Total: Gs</Typography>
      </Stack>
    </DialogTitle>
  );
}

export default Title;
