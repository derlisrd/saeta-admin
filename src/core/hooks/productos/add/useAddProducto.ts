
import { apiServiceImpuestos } from "@/services/api/factura/impuesto";
import { apiServiceCategorias } from "@/services/api/productos/categoria";
import { apiServiceDepositos } from "@/services/api/productos/deposito";
import { apiServiceMedidas } from "@/services/api/productos/medidas";
import { apiServiceProductos } from "@/services/api/productos/producto";
import { ImpuestoResults } from "@/services/dto/factura/impuesto";
import { AddProducto } from "@/services/dto/productos/AddProducto";
import { AddStock } from "@/services/dto/productos/AddStock";
import { CategoriaResults } from "@/services/dto/productos/categoria";
import { DepositoResults } from "@/services/dto/productos/deposito";
import { MedidasResults } from "@/services/dto/productos/medidas";
import useAuthStore from "@/store/authStore";
import { useCallback, useEffect, useState } from "react";

function useAddProducto() {
    
    const {userData} = useAuthStore()
    const [loading,setLoading] = useState(true);
    const [categorias,setCategorias] = useState<CategoriaResults[]>([]);
    const [impuestos,setImpuestos] = useState<ImpuestoResults[]>([]);
    const [depositos,setDepositos] = useState<DepositoResults[]>([]);
    const [medidas,setMedidas] = useState<MedidasResults[]>([]);
    const [form,setForm] = useState(new AddProducto({}));
    const [stockState,setStockState] = useState({deposito_id:0,cantidad:0});
    const [error,setError] = useState({code:0,message:''});
    const clearError = () => setError({code:0,message:''});
    
    const changeByName = (name: string, value: any) => {
        setForm((prev) => new AddProducto({ ...prev, [name]: value }));
      };



    const addStock = () => {
      const {deposito_id,cantidad} = stockState
        if (deposito_id === 0 || cantidad === 0) {
          setError({ code: 1, message: "Seleccione un depósito y una cantidad" });
          return;
        }
        const existingStock = form.stock.find((item) => item.deposito_id === deposito_id);
        const updatedStock = existingStock
          ? form.stock.map((item) =>
              item.deposito_id === deposito_id ? new AddStock({ ...item, cantidad: item.cantidad + cantidad }) : item
            )
          : [...form.stock, new AddStock({ deposito_id, cantidad })];
        setForm(new AddProducto({ ...form, stock: updatedStock }));
      };

      const removeStock = (deposito_id: number) => {
        const updatedStock = form.stock.filter((item) => item.deposito_id !== deposito_id);
        setForm(new AddProducto({ ...form, stock: updatedStock }));
      };
    
      const sendForm = async () => {
        try {
          const jsonForm = form.toJSON();
          await apiServiceProductos.add(jsonForm, userData && userData.token);
        } catch (err) {
          setError({ code: 500, message: "Error al enviar el formulario" });
        }
      };

    const getDatas = useCallback(async()=>{
        Promise.all([
            apiServiceImpuestos.list( userData && userData.token),
            apiServiceCategorias.list( userData && userData.token),
            apiServiceDepositos.list( userData && userData.token),
            apiServiceMedidas.list( userData && userData.token)
        ])
        .then(([impuestos,categorias,depositos,medidas])=>{
            if(impuestos.success){
                setImpuestos(impuestos.results || [])
            }
            if(categorias.success){
                setCategorias(categorias.results || [])
            }
            if(depositos.success){
                setDepositos(depositos.results || [])
            }
            if(medidas.success){
                setMedidas(medidas.results || [])
            }
        }).finally(()=>setLoading(false))
    },[userData])

    useEffect(()=>{
        getDatas()
    },[])

    return { form, setForm, clearError, error, changeByName, sendForm, impuestos, categorias, depositos, loading,medidas, addStock, stockState, setStockState, removeStock }
}

export default useAddProducto;