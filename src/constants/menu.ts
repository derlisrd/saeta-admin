import { menuType } from "@/core/types/menu";

const menu: menuType[] = [
  {
    id: 1,
    title: "Inicio",
    icon: "home",
    color: "#0066cc",
    url: "/",
    private: false,
    submenu: null,
    descripcion: "Inicio"
  },
  {
    id: 51,
    title: "Estadisticas",
    icon: "chart-histogram",
    color: "#0066cc",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 9876,
        title: "General",
        icon: "receipt_long",
        color: "#0066cc",
        url: "/estadisticas/general",
        private: false,
        descripcion: null,
        submenu: null
      },
      {
        id: 3987,
        title: "Producto",
        icon: "list",
        color: "#0066cc",
        url: "/estadisticas/producto",
        private: false,
        descripcion: "Estadisticas de producto",
        submenu: null
      }
    ]
  },
  {
    id: 2,
    title: "Clientes",
    icon: "users",
    color: "#0066cc",
    url: "/clientes",
    private: false,
    submenu: null,
    descripcion: "Clientes"
  },
  {
    id: 345,
    title: "Ventas",
    icon: "building-store",
    color: "#0066cc",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 14232,
        title: "Generar pedido",
        icon: "receipt_long",
        color: "#0066cc",
        url: "/ventas/pedidos/add",
        private: false,
        descripcion: null,
        submenu: null
      },
      {
        id: 343,
        title: "Lista de pedidos",
        icon: "list",
        color: "#0066cc",
        url: "/ventas/pedidos/lista",
        private: false,
        descripcion: "Lista de pedidos",
        submenu: null
      },
      {
        id: 344,
        title: "Devoluciones",
        icon: "list",
        color: "#0066cc",
        url: "/ventas/pedidos/devoluciones",
        private: false,
        descripcion: "Devoluciones",
        submenu: null
      },
      {
        id: 345,
        title: "Facturación",
        icon: "list",
        color: "#0066cc",
        url: "/ventas/facturacion",
        private: false,
        descripcion: "Facturación",
        submenu: null
      },
      {
        id: 346,
        title: "Créditos",
        icon: "list",
        color: "#0066cc",
        url: "/ventas/creditos/lista",
        private: false,
        descripcion: "Créditos",
        submenu: null
      }
    ]
  },
  {
    id: 34,
    title: "Productos",
    icon: "packages",
    color: "#0066cc",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 145,
        title: "Agregar producto",
        icon: "add",
        color: "#0066cc",
        url: "/productos/add",
        private: false,
        descripcion: "Agregar producto",
        submenu: null
      },
      {
        id: 343,
        title: "Lista de productos",
        icon: "list",
        color: "#0066cc",
        url: "/productos/lista",
        private: false,
        descripcion: "Lista de productos",
        submenu: null
      },
      {
        id: 3431,
        title: "Inventario",
        icon: "list",
        color: "#0066cc",
        url: "/productos/carga-stock",
        private: false,
        descripcion: "Inventario de productos",
        submenu: null
      },

      {
        id: 1425,
        title: "Categorias",
        icon: "category",
        color: "#0066cc",
        url: "/categorias",
        private: false,
        descripcion: "Lista de categorias",
        submenu: null
      }
    ]
  },

  {
    id: 3,
    title: "Configuración",
    icon: "settings",
    color: "#0066cc",
    url: null,
    private: false,
    open: false,
    descripcion: null,
    submenu: [
      {
        id: 1,
        title: "Empresa",
        icon: "store_mall_directory",
        color: "#0066cc",
        url: "/config/empresa",
        private: false,
        descripcion: "Configuracion de empresa",
        submenu: null
      },
      {
        id: 4,
        title: "Depósitos",
        icon: "tune",
        color: "#0066cc",
        url: "/config/depositos",
        private: false,
        descripcion: "Depositos",
        submenu: null
      },
      {
        id: 2,
        title: "Usuarios",
        icon: "tune",
        color: "#0066cc",
        url: "/config/users",
        private: false,
        descripcion: "Usuarios",
        submenu: null
      },
      {
        id: 3,
        title: "Parámetros",
        icon: "tune",
        color: "#0066cc",
        url: "/config/parametros",
        private: false,
        descripcion: "Parámetros",
        submenu: null
      }
    ]
  },
  {
    id: 8,
    title: "Tienda virtual",
    icon: "building-store",
    color: "#0066cc",
    url: "/tienda",
    private: false,
    descripcion: "",
    submenu: [
      {
        id: 3,
        title: "Información",
        icon: "tune",
        color: "#0066cc",
        url: "/tienda/info",
        private: false,
        descripcion: "",
        submenu: null
      },
      {
        id: 3,
        title: "Apariencia",
        icon: "tune",
        color: "#0066cc",
        url: "/tienda/apariencia",
        private: false,
        descripcion: "",
        submenu: null
      }
    ]
  }
];

export default menu;
