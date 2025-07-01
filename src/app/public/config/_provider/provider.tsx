import { createContext, useContext, useState } from "react";

type ContextType = {
    step: number;
};

const Context = createContext<ContextType | undefined>(undefined);

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState(1)



    const values = { step }
    return <Context.Provider value={values}>{children}</Context.Provider>;
};
const useConfigContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useConfigContext must be used within a ConfigProvider");
    }
    return context;
};

export { ConfigProvider, useConfigContext }
