import { Alert, AlertTitle, Snackbar, Zoom } from "@mui/material";

export interface NotificacionSnackProps {
  open: boolean;
  title?: string;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

function NotificacionSnack({ title, open, message, severity, onClose }: NotificacionSnackProps) {
  return (
    <Snackbar TransitionComponent={Zoom} open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default NotificacionSnack;
