
import { createContext, useState, useMemo, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/services/api";

import { VerificarEmpresaResults } from "@/services/dto/config/verificarConfigEmpresa";
import { useNavigate } from "react-router-dom";


interface ConfigContextType {
    empresaConfig: VerificarEmpresaResults | null;
    isLoadingConfig: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);


export const getEmpresaConfigFromStorage = () => {
    const data = localStorage.getItem('configEmpresa');
    return data ? JSON.parse(data) : null;
};

export const setEmpresaConfigToStorage = (config: VerificarEmpresaResults) => {
    localStorage.setItem('configEmpresa', JSON.stringify(config));
};

function ConfigProvider({ children }: { children: React.ReactNode }) {
    const nav = useNavigate()
    const [empresaConfig, setEmpresaConfig] = useState<VerificarEmpresaResults | null>(
        getEmpresaConfigFromStorage()
    );

    const { isLoading: isLoadingConfig } = useQuery({
        queryKey: ["config"],
        queryFn: () => API.config.verificarEmpresa(),
        enabled: empresaConfig === null,
        select: (response) => {
            if (response.success && response.results?.configurado) {
                setEmpresaConfig(response.results);
                setEmpresaConfigToStorage(response.results);
                return
            }
            nav("/config");
        },
    });

    const value = useMemo(
        () => ({
            empresaConfig,
            isLoadingConfig,
        }),
        [empresaConfig, isLoadingConfig]
    );

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    );
}

const useConfigContext = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfigContext must be used within a ConfigProvider");
    }
    return context;

}

export { ConfigProvider, useConfigContext };
