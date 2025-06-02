import { createContext, useCallback, useEffect } from "react";

interface ConfigContextType {

}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);


function ConfigProvider({ children }: { children: React.ReactNode }) {


    const check = useCallback(async () => {
        const localStore = window.localStorage.getItem("config");
        if (localStore === null || localStore === undefined) {
            window.localStorage.setItem("config", JSON.stringify({
                config: true
            }));
        }
    }, []);

    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) { check() }
        return () => {
            isActive = false;
            ca.abort();
        }
    }, [check]);

    return <ConfigContext.Provider value={{}}>
        {children}
    </ConfigContext.Provider>
}

export default ConfigProvider