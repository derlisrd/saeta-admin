import { useAuth } from "@/providers/AuthProvider";
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
import { useCallback, useEffect, useRef, useState } from "react";



function useAddProducto() {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<CategoriaResults[]>([]);
  const [impuestos, setImpuestos] = useState<ImpuestoResults[]>([]);
  const [depositos, setDepositos] = useState<DepositoResults[]>([]);
  const [medidas, setMedidas] = useState<MedidasResults[]>([]);
  const [form, setForm] = useState<AddProducto>(new AddProducto({}));
  const [stockState, setStockState] = useState<AddStock>(new AddStock({}));
  const [error, setError] = useState({ code: 0, message: "" });
  const [success, setSuccess] = useState({ active: false, message: "" });

  const clearSuccess = () => setSuccess({ active: false, message: "" });
  const clearForm = () => setForm(new AddProducto({}));
  const clearError = () => setError({ code: 0, message: "" });

  const clear = () => {
    clearForm();
    clearError();
  };

  const changeByName = (name: string, value: any) => {
    setForm((prev) => new AddProducto({ ...prev, [name]: value }));
  };

  const generateCode = ()=>{
    let code = Math.random().toString(36).slice(2);
    setForm((prev) => new AddProducto({ ...prev, codigo: code }));
    inputCodigoRef.current?.focus();
  }

  const verificarCodigoDisponible = async (codigo: string) => {
    if (!codigo) return;
    const res = await apiServiceProductos.verificarCodigoDisponible(codigo, userData && userData.token);
    if (!res) {
      setError({ code: 1, message: "El código ya está en uso" });
      inputCodigoRef.current?.focus();
      return
    }
    clearError();
  }

  /* const changeStockState = (name : string, value :number)=>{
      const updatedStockState = new AddStock({...stockState, [name]: value});
      setStockState(updatedStockState);
  }

  const addStock = () => {
    const { deposito_id, cantidad } = stockState;
    
    
    if (deposito_id === 0 || cantidad === 0 || !cantidad) {
      setError({ code: 9, message: "Seleccione un depósito y una cantidad" });
      return;
    }
    const depositoFind =  depositos.find(e=> e.id === deposito_id)

    const existingStock = form.stock.find((item) => item.deposito_id === deposito_id);
    const updatedStock = existingStock
      ? form.stock.map((item) => (item.deposito_id === deposito_id ? new AddStock({ ...item, cantidad: (item.cantidad || 0) + (cantidad) }) : item))      : [...form.stock, new AddStock({ deposito_id, cantidad: cantidad || 0, deposito: depositoFind?.nombre })];    setForm(new AddProducto({ ...form, stock: updatedStock }));

    setStockState(new AddStock({ deposito_id, cantidad: 0, deposito: depositoFind?.nombre }));
  }; */

  /* const removeStock = (deposito_id: number) => {
    const updatedStock = form.stock.filter((item) => item.deposito_id !== deposito_id);
    setForm(new AddProducto({ ...form, stock: updatedStock }));
  }; */

  

  const validateForm = () => {
    const { codigo, nombre, precio_minimo, precio_normal, category_id, impuesto_id, medida_id, costo } = form;
    if(!codigo){
      setError({ code: 1, message: "El código es requerido" });
      return false;
    }
    if(!nombre){
      setError({ code: 2, message: "El nombre es requerido" });
      return false;
    }
    if(impuesto_id === 0){
      setError({ code: 3, message: "Seleccione un impuesto" });
      return false;
    }
    if(category_id === 0){
      setError({ code: 4, message: "Seleccione una categoría" });
      return false;
    }
    if(medida_id === 0){
      setError({ code: 5, message: "Seleccione una medida" });
      return false;
    }

    if(!costo){
      setError({ code: 6, message: "El costo es requerido" });
      return false;
    }
    
    if(!precio_normal){
      setError({ code: 7, message: "El precio normal es requerido" });
      return false;
    }
    if(!precio_minimo){
      setError({ code: 8, message: "El precio mínimo es requerido" });
      return false;
    }
    
    clearError();
    return true
  }

  const sendForm = async () => {
    if(!validateForm()) return;
    
    setLoading(true);
    const res = await apiServiceProductos.add(form, userData && userData.token);
    setLoading(false);
    if (res.success) {
      setSuccess({ active: true, message: "Producto creado correctamente" });
      clear();
    }
  };

  const getDatas = useCallback(async () => {
    setLoading(true);

    const impuestosFromLocalStorage = localStorage.getItem('impuestos');
    const categoriasFromLocalStorage = localStorage.getItem('categorias');
    const depositosFromLocalStorage = localStorage.getItem('depositos');
    const medidasFromLocalStorage = localStorage.getItem('medidas');

    if (impuestosFromLocalStorage && categoriasFromLocalStorage && depositosFromLocalStorage && medidasFromLocalStorage) {
      setImpuestos(JSON.parse(impuestosFromLocalStorage));
      setCategorias(JSON.parse(categoriasFromLocalStorage));
      setDepositos(JSON.parse(depositosFromLocalStorage));
      setMedidas(JSON.parse(medidasFromLocalStorage));
      setLoading(false);
    } else {
      
      const [impuestosRes, categoriasRes, depositosRes, medidasRes] = await Promise.all([
        apiServiceImpuestos.list(userData && userData.token),
        apiServiceCategorias.list(userData && userData.token),
        apiServiceDepositos.list(userData && userData.token),
        apiServiceMedidas.list(userData && userData.token)
      ]);

      if (impuestosRes.success) {
        setImpuestos(impuestosRes.results || []);
        localStorage.setItem('impuestos', JSON.stringify(impuestosRes.results));
      }
      if (categoriasRes.success) {
        setCategorias(categoriasRes.results || []);
        localStorage.setItem('categorias', JSON.stringify(categoriasRes.results));
      }
      if (depositosRes.success) {
        setDepositos(depositosRes.results || []);
        localStorage.setItem('depositos', JSON.stringify(depositosRes.results));
      }
      if (medidasRes.success) {
        setMedidas(medidasRes.results || []);
        localStorage.setItem('medidas', JSON.stringify(medidasRes.results));
      }

      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    getDatas();
  }, []);

  return {
    form,
    setForm,
    clearError,
    error,
    changeByName,
    sendForm,
    impuestos,
    categorias,
    depositos,
    loading,
    medidas,
    stockState,
    setStockState,
    success,
    clearSuccess,
    verificarCodigoDisponible,
    generateCode,
    inputCodigoRef,

    tabValue, setTabValue
  };
}

export default useAddProducto;
