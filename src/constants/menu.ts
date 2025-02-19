export default [
    {
        id: 1,
        title: 'Inicio',
        icon: 'apps',
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
        id: 345,
        title: 'Ventas',
        icon: 'store',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        submenu: [
            {
                id: 14232,
                title: 'Generar pedido',
                icon: 'receipt_long',
                color: '#0066cc',
                url: '/ventas/pedidos/add',
                private: false,
            },
            {
                id: 343,
                title: 'Lista de pedidos',
                icon: 'list',
                color: '#0066cc',
                url: '/ventas/pedidos/lista',
                private: false,
            },
            {
                id: 1425,
                title: 'Formas de pagos',
                icon: 'payments',
                color: '#0066cc',
                url: '/ventas/formas-de-pago',
                private: false,
            }
        ],

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
                id: 142325,
                title: 'Agregar producto',
                icon: 'add',
                color: '#0066cc',
                url: '/productos/add',
                private: false,
            },
            {
                id: 343,
                title: 'Lista de productos',
                icon: 'list',
                color: '#0066cc',
                url: '/productos/lista',
                private: false,
            },
            
            {
                id: 1425,
                title: 'Categorias',
                icon: 'category',
                color: '#0066cc',
                url: '/categorias',
                private: false,
            }
        ]
    },
    {
        id: 3,
        title: 'Configuracion',
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
            },
            {
                id: 122322342,
                title: 'Tema',
                icon: 'brush',
                color: '#0066cc',
                url: '/config/tema',
                private: false,
            }
        ]
    },
]