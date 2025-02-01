import { useAuth } from "@/providers/AuthProvider";
import { apiServiceImpuestos } from "@/services/api/factura/impuesto";
import { apiServiceCategorias } from "@/services/api/productos/categoria";
import { apiServiceDepositos } from "@/services/api/productos/deposito";
import { apiServiceMedidas } from "@/services/api/productos/medidas";
import { apiServiceProductos } from "@/services/api/productos/producto";
import { AddProducto } from "@/services/dto/productos/AddProducto";
import { AddStock } from "@/services/dto/productos/AddStock";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AddProductoContext from "./context";
import { useMutation, useQuery } from "@tanstack/react-query";

interface AddProductoProviderProps {
  children: React.ReactNode;
}

const fetchData = async (token: string | null) => {
  const [impuestosRes, categoriasRes, depositosRes, medidasRes] = await Promise.all([
    apiServiceImpuestos.list(token),
    apiServiceCategorias.list(token),
    apiServiceDepositos.list(token),
    apiServiceMedidas.list(token),
  ]);

  if (!impuestosRes.success) throw new Error("Error fetching impuestos");
  if (!categoriasRes.success) throw new Error("Error fetching categorias");
  if (!depositosRes.success) throw new Error("Error fetching depositos");
  if (!medidasRes.success) throw new Error("Error fetching medidas");

  return {
    impuestos: impuestosRes.results || [],
    categorias: categoriasRes.results || [],
    depositos: depositosRes.results || [],
    medidas: medidasRes.results || [],
  };
};

function AddProductoProvider({ children }: AddProductoProviderProps) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const [tabValue, setTabValue] = useState(0);

  const [form, setForm] = useState<AddProducto>(new AddProducto({}));
  const [stockState, setStockState] = useState<AddStock>(new AddStock({}));
  const [error, setError] = useState({ code: 0, message: "" });
  const [success, setSuccess] = useState({ active: false, message: "" });

  const {
    data,
    isLoading,
    error: dataError,
  } = useQuery({
    queryKey: ["allData", userData?.token],
    queryFn: () => fetchData(userData && userData?.token),
    enabled: !!(userData && userData?.token),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("impuestos", JSON.stringify(data.impuestos));
      localStorage.setItem("categorias", JSON.stringify(data.categorias));
      localStorage.setItem("depositos", JSON.stringify(data.depositos));
      localStorage.setItem("medidas", JSON.stringify(data.medidas));
    }
  }, [data]);

  const clearSuccess = useCallback(() => setSuccess({ active: false, message: "" }), []);
  const clearForm = useCallback(() => setForm(new AddProducto({})), []);
  const clearError = useCallback(() => setError({ code: 0, message: "" }), []);

  const clear = useCallback(() => {
    setTabValue(0);
    clearForm();
    clearError();
  }, [clearForm, clearError]);

  const changeByName = useCallback((name: string, value: number | string) => {
    setForm((prev) => new AddProducto({ ...prev, [name]: value }));
  }, []);

  const generateCode = useCallback(() => {
    const code = Math.random().toString(36).slice(2);
    setForm((prev) => new AddProducto({ ...prev, codigo: code }));
    inputCodigoRef.current?.focus();
  }, []);

  const verificarCodigoDisponible = useCallback(
    async (codigo: string) => {
      if (!codigo) return;
      const res = await apiServiceProductos.verificarCodigoDisponible(codigo, userData && userData?.token);
      if (!res) {
        setError({ code: 1, message: "El código ya está en uso" });
        inputCodigoRef.current?.focus();
        return;
      }
      clearError();
    },
    [userData, clearError]
  );

  const changeStockState = useCallback((name: string, value: number) => {
    setStockState((prev) => new AddStock({ ...prev, [name]: value }));
  }, []);

  const addStock = useCallback(() => {
    const { deposito_id, cantidad } = stockState;
    if (deposito_id === 0 || cantidad === 0) {
      setError({ code: 9, message: "Seleccione un depósito y una cantidad" });
      return;
    }
    if (data) {
      const depositoFind = data.depositos.find((e) => e.id === deposito_id);
      if (!depositoFind) return;
      const updatedStock = form.stock.some((item) => item.deposito_id === deposito_id)
        ? form.stock.map((item) => (item.deposito_id === deposito_id ? new AddStock({ ...item, cantidad: item.cantidad + cantidad }) : item))
        : [...form.stock, new AddStock({ deposito_id, cantidad, deposito: depositoFind?.nombre })];
      setForm(new AddProducto({ ...form, stock: updatedStock }));
      setStockState((prev) => new AddStock({ ...prev, cantidad: 0 }));
    }
  }, [stockState, form]);

  const removeStock = useCallback((deposito_id: number) => {
    setForm((prev) => new AddProducto({ ...prev, stock: prev.stock.filter((item) => item.deposito_id !== deposito_id) }));
  }, []);

  const validateForm = useCallback(() => {
    const { codigo, nombre, precio_minimo, precio_normal, category_id, impuesto_id, medida_id, costo } = form;
    if (!codigo) {
      setError({ code: 1, message: "El código es requerido" });
      return false;
    }
    if (!nombre) {
      setError({ code: 2, message: "El nombre es requerido" });
      return false;
    }
    if (impuesto_id === 0) {
      setError({ code: 3, message: "Seleccione un impuesto" });
      return false;
    }
    if (category_id === 0) {
      setError({ code: 4, message: "Seleccione una categoría" });
      return false;
    }
    if (medida_id === 0) {
      setError({ code: 5, message: "Seleccione una medida" });
      return false;
    }

    if (!costo) {
      setError({ code: 6, message: "El costo es requerido" });
      return false;
    }

    if (!precio_normal) {
      setError({ code: 7, message: "El precio normal es requerido" });
      return false;
    }
    if (!precio_minimo) {
      setError({ code: 8, message: "El precio mínimo es requerido" });
      return false;
    }

    clearError();
    return true;
  }, [form, clearError]);

  const mutateCaller = useMutation({
    mutationFn: async () => {
      return apiServiceProductos.add(form, userData && userData?.token);
    },
    onSuccess: (res) => {
      if (res.success) {
        setSuccess({ active: true, message: "Producto creado correctamente" });
        clear();
      } else {
        setError({ code: 10, message: res.message || "Error al crear el producto" });
      }
    },
    onError: () => {
      setError({ code: 500, message: "Ocurrió un error inesperado" });
    },
  });
  const sendForm = useCallback(async () => {
    if (!validateForm()) throw new Error("Formulario inválido");
    mutateCaller.mutate();
  }, [validateForm, form, userData, clear]);

  const values = useMemo(
    () => ({
      form,
      setForm,
      clearError,
      error,
      changeByName,
      sendForm,
      impuestos: data?.impuestos || [], // Access data.impuestos, handle loading state
      categorias: data?.categorias || [],
      depositos: data?.depositos || [],
      medidas: data?.medidas || [],
      loading: isLoading || mutateCaller.isPending,
      addStock,
      stockState,
      setStockState,
      removeStock,
      success,
      clearSuccess,
      verificarCodigoDisponible,
      generateCode,
      inputCodigoRef,
      changeStockState,
      tabValue,
      setTabValue,
    }),
    [
      form,
      error,
      data?.impuestos,
      data?.categorias,
      data?.depositos,
      data?.medidas,
      isLoading,
      dataError,
      data,
      stockState,
      success,
      tabValue,
      clearError,
      changeByName,
      sendForm,
      addStock,
      setStockState,
      removeStock,
      clearSuccess,
      verificarCodigoDisponible,
      generateCode,
      changeStockState,
    ]
  );

  return <AddProductoContext.Provider value={values}>{children}</AddProductoContext.Provider>;
}

export default AddProductoProvider;
