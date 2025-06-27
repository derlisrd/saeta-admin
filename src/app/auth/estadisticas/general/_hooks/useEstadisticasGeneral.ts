import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { EstadisticasPeriodoResponse } from "@/services/dto/estadisticas/generales";
import { ProductosMasVendidosResponse } from "@/services/dto/estadisticas/productos";
import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

const useEstadisticasGeneral = () => {
    const { userData } = useAuth();

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [shouldFetch, setShouldFetch] = useState(false);
    
    // Extraer mes y año de la fecha seleccionada
    const mes = String(selectedDate.month() + 1); // dayjs months are 0-indexed
    const anio = String(selectedDate.year());

    // Múltiples queries con useQueries
    const queries = useQueries({
        queries: [
            {
                queryKey: ['estadisticas-periodo', mes, anio],
                queryFn: () => API.estadisticas.periodo(userData && userData.token, mes, anio),
                enabled: shouldFetch && !!userData?.token,
                retry: 1,
                staleTime: 5 * 60 * 1000, // 5 minutos
                select: (data : EstadisticasPeriodoResponse) => {
                  if(data){
                    return data.results
                  }
                  return null;
                },
                refetchOnWindowFocus: false
            },
            {
                queryKey: ['productos-mas-vendidos', mes, anio],
                queryFn: () => API.estadisticas.productosMasVendidos(userData && userData.token, mes, anio),
                enabled: shouldFetch && !!userData?.token,
                retry: 1,
                staleTime: 5 * 60 * 1000, // 5 minutos
                select: (data: ProductosMasVendidosResponse) => {
          if (data) {
            return data.results;
          }
          return null;
                },
                refetchOnWindowFocus: false
            },
        ]
    });

    // Extraer datos de cada query
    const [
        {
            data: dataPeriodo,
            isLoading: isLoadingPeriodo,
            error: errorPeriodo,
            refetch: refetchPeriodo,
            isFetching: isFetchingPeriodo
        },
        {
            data: dataProductos,
            isLoading: isLoadingProductos,
            error: errorProductos,
            refetch: refetchProductos,
            isFetching: isFetchingProductos
        }
    ] = queries;

    // Estados combinados
    const isLoading = isLoadingPeriodo || isLoadingProductos;
    const isFetching = isFetchingPeriodo || isFetchingProductos;
    const hasError = errorPeriodo || errorProductos;

    const handleDateChange = (newDate: dayjs.Dayjs) => {
        setSelectedDate(newDate);
        setShouldFetch(false); // Reset para que no se ejecute automáticamente
    };

    const handleConsultar = () => {
        setShouldFetch(true);
        // Refetch todas las queries
        refetchPeriodo();
        refetchProductos();
    };

    return {
        selectedDate,
        handleDateChange,
        handleConsultar,
        // Datos individuales
        dataPeriodo,
        dataProductos,
        // Estados combinados
        isLoading: isLoading || isFetching,
        hasError,
        // Errores individuales por si necesitas manejarlos por separado
        errorPeriodo,
        errorProductos,
        // Datos combinados si prefieres
        
            periodo: dataPeriodo,
            productos: dataProductos
        
    };
};

export default useEstadisticasGeneral;