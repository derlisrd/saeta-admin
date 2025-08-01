import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { useQuery } from "@tanstack/react-query";

function useQueryPermisos(enabled: boolean, userId: number) {
    const { userData } = useAuth()
    
    const { data: permisosOtorgados, isLoading } = useQuery({
        queryKey: ["permisosByUser", userId],
        queryFn: () => API.permisos.byUser(userData && userData.token, userId),
        select: (data) =>{
            if (data && data.results) return data.results;
            return []
        },
        enabled: enabled, //!!selectedUser && modals.permisos,
        refetchOnWindowFocus: false
    });
    return {
    permisosOtorgados,
    isLoading
    }

    /* const { mutateAsync, isPending } = useMutation({
        mutationKey: ["revocar", "asignar"],
        mutationFn: async ({ id, asignados, revocados }: { id: number; asignados: number[]; revocados: number[] }) => {
            if (revocados.length > 0) {
                return API.permisos.revocar(userData && userData.token, id, revocados);
            }
            if (asignados.length > 0) {
                return API.permisos.asignar(userData && userData.token, id, asignados);
            }
        },
        onSuccess: (data) => {
            if (data && data.success) {
                handleModals("permisos");
                setSelectedUser(null);
            }
        }
    })


    const permisosIniciales = useMemo(() => {
        if (!permisosData?.results || !permisos) return [];

        return permisos.map((i) => ({
            id: i.id,
            permiso_id: i.id,
            modulo: i.modulo,
            accion: i.accion,
            user_id: selectedUser ? selectedUser.id : 0,
            checked: permisosData.results.some((j) => j.permiso_id === i.id),
        }));
    }, [permisosData?.results, permisos, selectedUser]);

    useEffect(() => {
        if (permisosIniciales.length > 0) {
            setPermisosSelect(permisosIniciales);
        }
    }, [permisosIniciales]);

    // Función para manejar el cambio de checkbox
    const handleCheckboxChange = (permisoId: number) => {
        setPermisosSelect(prev =>
            prev.map(permiso =>
                permiso.id === permisoId
                    ? { ...permiso, checked: !permiso.checked }
                    : permiso
            )
        );
    };

    const close = () => setSelectedUser(null); handleModals("permisos");

    const handleSave = async () => {
        const permisosParaEnviar: number[] = [];
        const permisosRevocados: number[] = [];

        permisosSelect.forEach(permisoActual => {
            // Encontrar el estado inicial de este permiso
            const permisoInicial = permisosIniciales.find(p => p.id === permisoActual.id);

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
        await mutateAsync({ id: selectedUser?.id, asignados: permisosParaEnviar, revocados: permisosRevocados });
    };
     */
    
}

export default useQueryPermisos;
