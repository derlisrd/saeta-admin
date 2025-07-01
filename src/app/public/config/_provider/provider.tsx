// _provider/provider.tsx (No changes needed from the previous response for this file)
import { typeConfigForm } from "@/core/types/configForm";
import API from "@/services/api";
import { VerificarEmpresaResults } from "@/services/dto/config/verificarConfigEmpresa";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { config } from "@/constants/config";


type ContextType = {
    step: number;
    nextStep: () => void;
    backStep: () => void;
    formData: typeConfigForm;
    setFormData: React.Dispatch<React.SetStateAction<typeConfigForm>>;
    sendForm: () => Promise<void>;
    isPending: boolean;
    error: Error | null;
    dataSuccess: VerificarEmpresaResults | undefined;
    finalizar: () => void;
};

const Context = createContext<ContextType | undefined>(undefined);

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<typeConfigForm>({
        nombre: '',
        ruc: '',
        telefono: '',
        direccion: '',
        propietario: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [dataSuccess, setDataSuccess] = useState<VerificarEmpresaResults>();

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const backStep = () => setStep((prevStep) => prevStep - 1);

    const finalizar = () => {
        window.localStorage.setItem(config.CONFIG_LOCAL_STORAGE, JSON.stringify(dataSuccess));
        window.location.href = "/";
    }





    const { isPending, error, mutateAsync } = useMutation({
        mutationKey: ["configEmpresa"],
        mutationFn: () => API.config.configurarPrimeraVez(formData),
        onSuccess: (data) => {
            if (data && data.success && data.results) {
                setDataSuccess(data.results);
                setStep(3)
            }
        }
    })
    const sendForm = async () => { await mutateAsync() }



    const values = { step, nextStep, backStep, formData, setFormData, sendForm, isPending, error, dataSuccess, finalizar };

    return <Context.Provider value={values}>{children}</Context.Provider>;
};

const useConfigContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useConfigContext must be used within a ConfigProvider");
    }
    return context;
};

export { ConfigProvider, useConfigContext };