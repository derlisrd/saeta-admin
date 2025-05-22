import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

function EstadisticasProducto() {
    const { userData } = useAuth()
    const { data } = useQuery({
        queryKey: ["estadisticas-producto"],
        queryFn: () => API.estadisticas.producto(userData && userData.token, 4, "2023-01-01", "2025-12-31"),
        select: (data) => {
            if (data.success) {
                return data.results;
            }
        },
    });

    console.log(data);

    return <Container>
        <h1>EstadisticasProducto</h1>
    </Container>
}

export default EstadisticasProducto;