
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/services/api";
import { config as configConstants } from '@/constants/config'
import { VerificarEmpresaResults } from "@/services/dto/config/verificarConfigEmpresa";
import { useNavigate } from "react-router-dom";



interface ConfigContextType {
    isLoadingConfig: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);


export const getEmpresaConfigFromStorage = () => {
    const data = localStorage.getItem(configConstants.CONFIG_LOCAL_STORAGE);
    return data ? JSON.parse(data) : null;
};



function ConfigProvider({ children }: { children: React.ReactNode }) {
    const nav = useNavigate();


    const { isLoading: isLoadingConfig } = useQuery({
        queryKey: ["config"],
        queryFn: () => API.config.verificarEmpresa(),
        enabled: () => {
            const store = window.localStorage.getItem(configConstants.CONFIG_LOCAL_STORAGE)
            return store ? false : true;
        },
        select: (response) => {
            if (response.success && response.results?.configurado) {
                window.localStorage.setItem(configConstants.CONFIG_LOCAL_STORAGE, JSON.stringify(response.results));
            }
            if (response.success && response.results?.configurado === false) {
                nav('/config')
            }
            return response;
        },
    });


    const values = { isLoadingConfig }

    return (
        <ConfigContext.Provider value={values}>
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
