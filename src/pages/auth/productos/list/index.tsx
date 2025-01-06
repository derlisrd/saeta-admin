import API from "@/services/api";
import useAuthStore from "@/store/authStore";
import { Box } from "@mui/material";
import { useEffect } from "react";

function ListaProductos() {
  const { userData } = useAuthStore();
  const fetchData = async () => {
    const res = await API.productos.list(userData && userData?.token);
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Box></Box>;
}

export default ListaProductos;
