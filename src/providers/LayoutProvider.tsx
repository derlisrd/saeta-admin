import { ReactNode, createContext, useContext, useState } from "react";


interface LayoutContextType {
    DRAWER_WIDTH: number;
    COLLAPSED_WIDTH: number;
    isOpenMenu: boolean;
    isOpenMobileMenu: boolean;
    isOpenConfigDrawer: boolean;
    toggleMenu: () => void;
    toggleMobileMenu: () => void;
    toggleConfigDrawer: () => void;
    /*     setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
        setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
        setIsOpenConfigDrawer: React.Dispatch<React.SetStateAction<boolean>>; */
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);


export function LayoutProvider({ children }: { children: ReactNode }) {
    const [DRAWER_WIDTH] = useState(210)
    const [COLLAPSED_WIDTH] = useState(60)
    const [isOpenMenu, setIsOpenMenu] = useState(true)
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
    const [isOpenConfigDrawer, setIsOpenConfigDrawer] = useState(false);

    const toggleMenu = () => setIsOpenMenu(!isOpenMenu)
    const toggleMobileMenu = () => setIsOpenMobileMenu(!isOpenMobileMenu)
    const toggleConfigDrawer = () => setIsOpenConfigDrawer(!isOpenConfigDrawer);


    return (
        <LayoutContext.Provider
            value={{
                isOpenMenu,
                toggleMenu,
                toggleMobileMenu,
                isOpenMobileMenu,
                DRAWER_WIDTH,
                COLLAPSED_WIDTH,
                isOpenConfigDrawer,
                toggleConfigDrawer,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
}

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("useLayoutContext must be used within a LayoutProvider");
    }
    return context;
};
