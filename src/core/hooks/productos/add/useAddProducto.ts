import { apiServiceImpuestos } from "@/services/api/factura/impuesto";
import { apiServiceCategorias } from "@/services/api/productos/categoria";
import { apiServiceDepositos } from "@/services/api/productos/deposito";
import { apiServiceMedidas } from "@/services/api/productos/medidas";
import { ImpuestoResults } from "@/services/dto/factura/impuesto";
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
    const [form,setForm] = useState({
        impuesto_id:0,
        medida_id:0,
        category_id:0,
        codigo:'',
        nombre:'',
        costo:0,
        precio_normal:0,
        precio_minimo:0,
        disponible:1,
        tipo:1,
        cantidad_minima:0,
        stock: [] as Array<{ deposito_id: number; cantidad: number; }>
    });
    const [stockState,setStockState] = useState({deposito_id:0,cantidad:0});
    const [error,setError] = useState({code:0,message:''});
    const clearError = () => setError({code:0,message:''});
    
    const changeByName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = event.target
        setForm({...form,[name]:value})
    }


    const addStock = () => {
        const {deposito_id,cantidad} = stockState;
        if(deposito_id === 0 || cantidad === 0){
            setError({code:1,message:'Seleccione un deposito y una cantidad'})
            return;
        }
        const existingStock = form.stock.find(item => item.deposito_id === deposito_id);
        if (existingStock) {
            const updatedStock = form.stock.map(item => {
                if (item.deposito_id === deposito_id) {
                    return { ...item, cantidad: item.cantidad + cantidad };
                }
                return item;
            });
            setForm({ ...form, stock: updatedStock });
        } else {
            setForm({ ...form, stock: [...form.stock, { deposito_id, cantidad }] });
        }
        setStockState({deposito_id:deposito_id,cantidad:0})
    }

    const sendForm = async () => {
        console.log(form)
    }

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

    return { form, setForm, clearError, error, changeByName, sendForm, impuestos, categorias, depositos, loading,medidas, addStock, stockState, setStockState }
}

export default useAddProducto;