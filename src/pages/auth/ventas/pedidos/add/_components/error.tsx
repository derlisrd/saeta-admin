import { Alert, Slide, Snackbar } from "@mui/material";

interface ErrorProps {
  error: { active: boolean; message: string };
  clearError: () => void;
}

function Error({ error, clearError }: ErrorProps) {
  return (
    <Snackbar TransitionComponent={Slide} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={error.active}>
      <Alert onClose={clearError} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error.message}
      </Alert>
    </Snackbar>
  );
}

export default Error;
