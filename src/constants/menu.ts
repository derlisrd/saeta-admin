export default [
    {
        id: 1,
        title: 'Inicio',
        icon: 'home',
        color: '#0066cc',
        url: '/',
        private: false,
        submenu: null,
        descripcion: null
    },
    {
        id: 2,
        title: 'Clientes',
        icon: 'users',
        color: '#0066cc',
        url: '/clientes',
        private: false,
        submenu: null,
        descripcion: 'Clientes'
    },
    {
        id: 345,
        title: 'Ventas',
        icon: 'building-store',
        color: '#0066cc',
        url: null,
        private: false,
        open: false,
        descripcion: null,
        submenu: [
            {
                id: 14232,
                title: 'Generar pedido',
                icon: 'receipt_long',
                color: '#0066cc',
                url: '/ventas/pedidos/add',
                private: false,
                descripcion: null
            },
            {
                id: 343,
                title: 'Lista de pedidos',
                icon: 'list',
                color: '#0066cc',
                url: '/ventas/pedidos/lista',
                private: false,
                descripcion: 'Lista de pedidos'
            },
            {
                id: 344,
                title: 'Devoluciones',
                icon: 'list',
                color: '#0066cc',
                url: '/ventas/pedidos/devoluciones',
                private: false,
                descripcion: 'Devoluciones'
            },
            {
                id: 345,
                title: 'Facturación',
                icon: 'list',
                color: '#0066cc',
                url: '/ventas/facturacion',
                private: false,
                descripcion: 'Facturación'
            },
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
        descripcion: null,
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
                private: false,
                descripcion: 'Abrir o habilitar caja' 
            },
            {
                id: 14232,
                title: 'Movimientos',
                icon: 'add',
                color: '#0066cc',
                url: '/caja/movimientos',
                private: false,
                descripcion: 'Lista de movimientos'
            },
        {
                id: 142,
                title: 'Cerrar caja',
                icon: 'close',
                color: '#0066cc',
                url: '/caja/cerrar',
                private: false,
                descripcion: 'Cerrar caja'
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
        descripcion: null,
        submenu: [
            {
                id: 145,
                title: 'Agregar producto',
                icon: 'add',
                color: '#0066cc',
                url: '/productos/add',
                private: false,
                descripcion: 'Agregar producto'
            },
            {
                id: 343,
                title: 'Lista de productos',
                icon: 'list',
                color: '#0066cc',
                url: '/productos/lista',
                private: false,
                descripcion: 'Lista de productos'
            },
            {
                id: 3431,
                title: 'Reposición',
                icon: 'list',
                color: '#0066cc',
                url: '/productos/carga-stock',
                private: false,
                descripcion: 'Reposición de stock de productos'
            },
            
            {
                id: 1425,
                title: 'Categorias',
                icon: 'category',
                color: '#0066cc',
                url: '/categorias',
                private: false,
                descripcion: 'Lista de categorias'
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
        descripcion: null,
        submenu: [
            {
                id: 14232,
                title: 'Generar compra',
                icon: 'receipt_long',
                color: '#0066cc',
                url: '/compras/add',
                private: false,
                descripcion: null
            },
            {
                id: 34,
                title: 'Lista de compras',
                icon: 'list',
                color: '#0066cc',
                url: '/compras/lista',
                private: false,
                descripcion: 'Lista de compras'
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
        descripcion: null,
        submenu: [
            {
                id: 122342,
                title: 'Empresa',
                icon: 'store_mall_directory',
                color: '#0066cc',
                url: '/config/empresa',
                private: false,
                descripcion: null
            },
            {
                id: 1222,
                title: 'Parámetros',
                icon: 'tune',
                color: '#0066cc',
                url: '/config/parametros',
                private: false,
                descripcion: 'Parámetros'
            }
            ,
            {
                id: 22342,
                title: 'Tema',
                icon: 'brush',
                color: '#0066cc',
                url: '/config/tema',
                private: false,
                descripcion: 'Tema'
            }
        ]
    },
]