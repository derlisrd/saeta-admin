export type menuType = {
    id: number;
    title: string;
    descripcion: string | null;
    icon: string;
    color: string;
    url: string | null;
    submenu: menuType[] | null;
    open?: boolean;
    private: boolean;
}