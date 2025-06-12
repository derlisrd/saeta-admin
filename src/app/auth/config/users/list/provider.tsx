import { useAuth } from "@/providers/AuthProvider";
import API from "@/services/api";
import { PermisosResponse, PermisosResults } from "@/services/dto/auth/permisos";
import { UserListResponse, UserListResults } from "@/services/dto/users/user";
import { useQueries } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export type modalsType = {
    permisos: boolean
}

type ContextUserProviderType = {
    modals: modalsType;
    handleModals: (modalName: keyof modalsType) => void;
    isLoading: boolean;
    error: Error | null | undefined;
    selectedUser: UserListResults | null;
    setSelectedUser: Dispatch<SetStateAction<UserListResults | null>>;
    users: UserListResults[];
    permisos: PermisosResults[];
};

const UserContext = createContext<ContextUserProviderType | null>(null);

function UserProvider({ children }: { children: React.ReactNode }) {
    const { userData } = useAuth()
    const [modals, setModals] = useState<modalsType>({ permisos: false })
    const [selectedUser, setSelectedUser] = useState<UserListResults | null>(null)
    const handleModals = (modalName: keyof modalsType) => setModals({ ...modals, [modalName]: !modals[modalName] })

    const results = useQueries({
        queries: [
            {
                queryKey: ["users"],
                queryFn: () => API.users.list(userData && userData.token),
                select: (data: UserListResponse) => {
                    if (data && data.results) return data.results
                    return []
                },
                staleTime: 1000 * 60 * 5,
                retry: false
            },
            {
                queryKey: ["permisos"],
                queryFn: () => API.permisos.list(userData && userData.token),
                select: (data: PermisosResponse) => {
                    if (data && data.results) return data.results
                    return []
                },
                staleTime: 1000 * 60 * 5,
                retry: false
            }
        ]
    });

    const [usersRes, permisosRes] = results;


    const isLoading = results.some((r) => r.isLoading);
    const dataError = results.find((r) => r.error)?.error;
    // const isError = results.some((r) => r.isError);


    const data = {
        users: usersRes.data ? usersRes.data : [],
        permisos: permisosRes.data ? permisosRes.data : [],
    };

    const values = {
        modals,
        handleModals,
        isLoading,
        users: data.users,
        permisos: data.permisos,
        error: dataError,
        selectedUser,
        setSelectedUser
    };

    return <UserContext.Provider value={values}>
        {children}
    </UserContext.Provider>
}

export const useUserProvider = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserProvider must be used within a UserProvider");
    }
    return context;
}

export default UserProvider;