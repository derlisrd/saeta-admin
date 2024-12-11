export default [
    {
        id: 1,
        title: 'Inicio',
        icon: 'other_houses',
        color: '#0066cc',
        url: '/',
        private: false,
        submenu: null
    },
    {
        id: 2,
        title: 'Clientes',
        icon: 'people',
        color: '#0066cc',
        url: '/clientes',
        private: false,
        submenu: null
    },
    {
        id: 34,
        title: 'Productos',
        icon: 'inventory_2',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        submenu: [
            {
                id: 343,
                title: 'Productos',
                icon: 'inventory',
                color: '#0066cc',
                url: '/productos/lista',
                private: false,
            },
            {
                id: 1425,
                title: 'Categorias',
                icon: 'category',
                color: '#0066cc',
                url: '/registros/categorias',
                private: false,
            },
            {
                id: 145,
                title: 'Clientes',
                icon: 'supervisor_account',
                color: '#0066cc',
                url: '/registros/clientes',
                private: false,
            },
            {
                id: 14,
                title: 'Usuarios',
                icon: 'manage_accounts',
                color: '#0066cc',
                url: '/config/usuarios',
                private: false,
            }
        ]
    },
    {
        id: 3,
        title: 'Config.',
        icon: 'settings',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        submenu: [
            {
                id: 122342,
                title: 'Empresa',
                icon: 'admin_panel_settings',
                color: '#0066cc',
                url: '/config/empresa',
                private: false,
            }
        ]
    },
]