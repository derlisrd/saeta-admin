import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { OptionsResults } from "@/services/dto/tienda/options";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

export type notiType = {
    title: string;
    message: string;
    type?: "success" | "error" | "warning" | "info"
    icon?: string;
}

interface IOptions {
    options: OptionsResults[];
    updateInfoOption: (option: OptionsResults) => Promise<void>;
    isUpdated: boolean;
    isPending: boolean;
    isLoading: boolean;
    noti: notiType | null;
    setNoti: React.Dispatch<React.SetStateAction<notiType | null>>;
}

const Context = createContext<IOptions | undefined>(undefined)


function OptionsProvider({ children }: { children: React.ReactNode }) {

    const { userData } = useAuth()
    const [noti, setNoti] = useState<notiType | null>(null)
    const { data, isLoading } = useQuery({
        queryKey: ["options"],
        queryFn: async () => API.options.all(userData && userData.token),
        select: (data) => data.results,
        refetchOnWindowFocus: false
    })

    const updateInfo = useMutation({
        mutationKey: ['updateOption'],
        mutationFn: (option: OptionsResults) => API.options.createOrUpdate(userData && userData.token, option),
        onSuccess: (data, variables) => {
            if (data) {
                setNoti({
                    title: "Success",
                    message: variables.key + " actualizado correctamente",
                    type: "success",
                    icon: "check-circle",
                });
            }
        },
        onError(error) {
            setNoti({
                title: "Error",
                message: error.message,
                type: "error",
                icon: "error"
            })
        },
    })

    const updateInfoOption = async (option: OptionsResults) => {
        await updateInfo.mutateAsync(option);
    }

    const values = {
        options: data || [],
        updateInfoOption,
        isLoading,
        isPending: updateInfo.isPending,
        isUpdated: updateInfo.isSuccess,
        noti,
        setNoti,
    };

    return <Context.Provider value={values}>{children}</Context.Provider>
}

export const useOptionsProvider = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error("useOptionsProvider must be used within a OptionsProvider")
    }
    return context
}

export default OptionsProvider;