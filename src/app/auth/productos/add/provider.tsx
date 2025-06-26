import { useAuth } from "@/providers/AuthProvider";

import { AddProducto } from "@/services/dto/productos/AddProducto";
import { AddStock } from "@/services/dto/productos/AddStock";
import { useCallback, useMemo, useRef, useState } from "react";
import AddProductoContext, { modalType } from "./context";
import { useMutation, useQueries } from "@tanstack/react-query";

import API from "@/services/api";
import { ImpuestoResponse } from "@/services/dto/factura/impuesto";
import { CategoriaResponse } from "@/services/dto/productos/categoria";
import { DepositoResponse } from "@/services/dto/productos/deposito";
import { MedidasResponse } from "@/services/dto/productos/medidas";
import { validateForm } from "./helpers/validate";



function AddProductoProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth();

  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const [tabValue, setTabValue] = useState(0);

  const [form, setForm] = useState<AddProducto>(new AddProducto({}));
  const [stockState, setStockState] = useState<AddStock>(new AddStock({}));
  const [error, setError] = useState({ code: 0, message: "" });
  const [success, setSuccess] = useState({ active: false, message: "" });

  const [modal, setModal] = useState<modalType>({
    categorias: false,
    unidad: false,
  });
  const handleModal = useCallback((key: keyof modalType) => {
    setModal((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const results = useQueries({
    queries: [
      {
        queryKey: ["impuestos"],
        queryFn: () => API.impuestos.list(userData && userData.token),
        select: (data: ImpuestoResponse) => (data && data.results) ? data.results : [],
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["categorias"],
        queryFn: () => API.categorias.list(userData && userData.token),
        select: (data: CategoriaResponse) => (data && data.results) ? data.results : [],
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["depositos", 'productos'],
        queryFn: () => API.depositos.list(userData && userData.token),
        select: (data: DepositoResponse) => (data && data.results) ? data.results : [],
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ["medidas"],
        queryFn: () => API.medidas.list(userData && userData.token),
        select: (data: MedidasResponse) => (data && data.results) ? data.results : [],
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const [impuestosRes, categoriasRes, depositosRes, medidasRes] = results;


  const isLoading = results.some((r) => r.isLoading);
  const dataError = results.find((r) => r.error)?.error;
  const isError = results.some((r) => r.isError);


  const data = {
    impuestos: impuestosRes.data ? impuestosRes.data : [],
    categorias: categoriasRes.data ? categoriasRes.data : [],
    depositos: depositosRes.data ? depositosRes.data : [],
    medidas: medidasRes.data ? medidasRes.data : [],
  };


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
    const code = Math.floor(10000000 + Math.random() * 99999999).toString();
    setForm((prev) => new AddProducto({ ...prev, codigo: code }));
    inputCodigoRef.current?.focus();
  }, []);

  const verificarCodigoDisponible = useCallback(
    async (codigo: string) => {
      if (!codigo) return;
      const res = await API.productos.verificarCodigoDisponible(codigo, userData && userData?.token);
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
    setError({ code: 0, message: "" });
    if (data && cantidad) {
      const depositoFind = data.depositos.find((e) => e.id === deposito_id);
      if (!depositoFind) return;
      const updatedStock = form.stock.some((item) => item.deposito_id === deposito_id)
        ? form.stock.map((item) => (item.deposito_id === deposito_id ? new AddStock({ ...item, cantidad: (item.cantidad ?? 0) + cantidad }) : item))
        : [...form.stock, new AddStock({ deposito_id, cantidad, deposito: depositoFind?.nombre })];

      setForm(prev => new AddProducto({ ...prev, stock: updatedStock }));
      setStockState((prev) => new AddStock({ ...prev, cantidad: 0 }));
    }
  }, [stockState, form]);

  const removeStock = useCallback((deposito_id: number) => {
    setForm((prev) => new AddProducto({ ...prev, stock: prev.stock.filter((item) => item.deposito_id !== deposito_id) }));
  }, []);



  const mutateCaller = useMutation({
    mutationFn: async () => {
      return API.productos.add(form, userData && userData?.token);
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
    const validateError = validateForm(form);
    if (validateError.code > 0) {
      setError({ code: validateError.code, message: validateError.message });
      return;
    }
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
      impuestos: data.impuestos, // Access data.impuestos, handle loading state
      categorias: data?.categorias,
      depositos: data.depositos,
      medidas: data.medidas,
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
      modal,
      handleModal,
      dataError,
      isError
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
      isError,
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
      modal,
      handleModal,
    ]
  );

  return <AddProductoContext.Provider value={values}>{children}</AddProductoContext.Provider>;
}

export default AddProductoProvider;
