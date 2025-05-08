import { useContext } from "react";
import AddProductoContext from "../context";

const useAddProducto = () => {
  const context =  useContext(AddProductoContext);
  if(!context){
    throw new Error('Add producto context fail')
  }
  return context
};

export default useAddProducto;
