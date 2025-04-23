import { useState } from 'react';

type SeverityType = "success" | "error" | "warning" | "info";

interface UseNotificacionReturn {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: SeverityType;
  mostrarNotificacion: (mensaje: string, tipo?: SeverityType) => void;
  cerrarNotificacion: () => void;
}

export default function useNotificacionSnack(): UseNotificacionReturn {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SeverityType>("success");

  const mostrarNotificacion = (mensaje: string, tipo: SeverityType = "success") => {
    setSnackbarMessage(mensaje);
    setSnackbarSeverity(tipo);
    setSnackbarOpen(true);
  };

  const cerrarNotificacion = () => {
    setSnackbarOpen(false);
  };

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    mostrarNotificacion,
    cerrarNotificacion
  };
}