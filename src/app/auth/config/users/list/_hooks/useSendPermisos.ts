import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useMutation } from "@tanstack/react-query";

type PermisosMapeados = {
  id: number;
  permiso_id: number;
  modulo: string;
  accion: string;
  checked: boolean;
};

function useSendPermisos() {
  const { userData } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["revocarAsignarPermisos"],
    mutationFn: async ({ id, asignados, revocados }: { id: number; asignados: number[]; revocados: number[] }) => {
      const token = userData && userData.token;
      const results = [];

      if (revocados.length > 0) {
        const res = await API.permisos.revocar(token, id, revocados);
        results.push(res);
      }

      if (asignados.length > 0) {
        const res = await API.permisos.asignar(token, id, asignados);
        results.push(res);
      }

      return results;
    }
  });

  const sendPermisos = async (permisosIniciales: PermisosMapeados[], permisosSeleccionados: PermisosMapeados[], selectedUser: number) => {
    const permisosParaEnviar: number[] = [];
    const permisosRevocados: number[] = [];

    permisosSeleccionados.forEach((permisoActual) => {
      // Encontrar el estado inicial de este permiso
      const permisoInicial = permisosIniciales.find((p) => p.id === permisoActual.id);

      if (permisoInicial) {
        // Si inicialmente era false y ahora es true = NUEVO PERMISO
        if (!permisoInicial.checked && permisoActual.checked) {
          permisosParaEnviar.push(permisoActual.permiso_id);
        }
        // Si inicialmente era true y ahora es false = PERMISO REVOCADO
        else if (permisoInicial.checked && !permisoActual.checked) {
          permisosRevocados.push(permisoActual.permiso_id);
        }
        // Si no cambió el estado, no se envía nada
      }
    });
    if (!selectedUser) return;

    await mutateAsync({ id: selectedUser, asignados: permisosParaEnviar, revocados: permisosRevocados });
  };

  return { sendPermisos, isPending };
}

export default useSendPermisos;
