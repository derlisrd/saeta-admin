export default [
    {
        id: 1,
        title: 'Inicio',
        icon: 'home',
        color: '#0066cc',
        url: '/',
        private: false,
        submenu: null
    },
    {
        id: 2,
        title: 'Clientes',
        icon: 'users',
        color: '#0066cc',
        url: '/clientes',
        private: false,
        submenu: null
    },
    {
        id: 345,
        title: 'Ventas',
        icon: 'building-store',
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
            }
        ],

    },
    {
        id: 1334,
        title: 'Caja',
        icon: 'cash-register',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        submenu: [
            {
                id: 1432,
                title: 'Abrir caja',
                icon: 'add',
                color: '#0066cc',
                url: '/caja/add',
                private: false,
                },
                {
                id: 343,
                title: 'Lista de cajas',
                icon: 'list',
                color: '#0066cc',
                url: '/caja/lista',
                private: false 
            },
            {
                id: 14232,
                title: 'Movimientos',
                icon: 'add',
                color: '#0066cc',
                url: '/productos/add',
                private: false,
            },
        {
                id: 142,
                title: 'Cerrar caja',
                icon: 'close',
                color: '#0066cc',
                url: '/caja/cerrar',
                private: false,
            },
        ],
    },
    {
        id: 34,
        title: 'Productos',
        icon: 'packages',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        submenu: [
            {
                id: 145,
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
        id: 3565,
        title: 'Compras',
        icon: 'shopping-cart',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        submenu: [
            {
                id: 14232,
                title: 'Generar compra',
                icon: 'receipt_long',
                color: '#0066cc',
                url: '/compras/add',
                private: false,
            },
            {
                id: 34,
                title: 'Lista de compras',
                icon: 'list',
                color: '#0066cc',
                url: '/compras/lista',
                private: false,
            }
        ],
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
                icon: 'store_mall_directory',
                color: '#0066cc',
                url: '/config/empresa',
                private: false,
            },
            {
                id: 1222,
                title: 'Parámetros',
                icon: 'tune',
                color: '#0066cc',
                url: '/config/parametros',
                private: false,
            }
            ,
            {
                id: 22342,
                title: 'Tema',
                icon: 'brush',
                color: '#0066cc',
                url: '/config/tema',
                private: false,
            }
        ]
    },
]