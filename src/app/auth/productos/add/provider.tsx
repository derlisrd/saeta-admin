import { useAuth } from "@/providers/AuthProvider";

import { AddProducto } from "@/services/dto/productos/AddProducto";
import { useCallback, useRef, useState } from "react";
import AddProductoContext, { modalType } from "./context";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

import API from "@/services/api";
import { ImpuestoResponse } from "@/services/dto/factura/impuesto";
import { CategoriaResponse } from "@/services/dto/productos/categoria";
import { DepositoActivoResponse } from "@/services/dto/productos/deposito";
import { MedidasResponse } from "@/services/dto/productos/medidas";
import { validateForm } from "./helpers/validate";



function AddProductoProvider({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const [tabValue, setTabValue] = useState(0);


  const [form, setForm] = useState<AddProducto>(new AddProducto({}));
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
        queryKey: ["medidas"],
        queryFn: () => API.medidas.list(userData && userData.token),
        select: (data: MedidasResponse) => (data && data.results) ? data.results : [],
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["depositoActivo"],
        queryFn: async () => API.depositos.activo(userData && userData.token),
        select: (data: DepositoActivoResponse) => {
          if (data && data.success && data.results) {
            return data.results;
          }
          return {
            id: 0,
            nombre: '',
            sucursal_id: 0,
            descripcion: '',
            activo: 0
          }
        }
      }
    ],
  });

  const [impuestosRes, categoriasRes, medidasRes, depositosRes] = results;


  const isLoading = results.some((r) => r.isLoading);
  const dataError = results.find((r) => r.error)?.error;
  const isError = results.some((r) => r.isError);


  const data = {
    impuestos: impuestosRes.data ? impuestosRes.data : [],
    categorias: categoriasRes.data ? categoriasRes.data : [],
    medidas: medidasRes.data ? medidasRes.data : [],
    depositoActivo: depositosRes.data || { id: 0, nombre: "", sucursal_id: 0, descripcion: "", activo: 0 },
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

  const mutateCaller = useMutation({
    mutationFn: async ({ formulario }: { formulario: AddProducto }) => API.productos.add(formulario, userData && userData?.token),
    onSuccess: (res) => {
      if (res && res.success) {
        queryClient.invalidateQueries({ queryKey: ["productos"] });
        setSuccess({ active: true, message: "Producto creado correctamente" });
        clear();
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
    const f = new AddProducto({ ...form })
    f.deposito_id = data.depositoActivo.id
    mutateCaller.mutate({ formulario: f });
  }, [validateForm, form, mutateCaller, data.depositoActivo.id]);


  const values = {
    form,
    setForm,
    clearError,
    error,
    changeByName,
    sendForm,
    impuestos: data.impuestos,
    categorias: data.categorias,
    medidas: data.medidas,
    loading: isLoading || mutateCaller.isPending,
    depositoActivo: data.depositoActivo,
    success,
    clearSuccess,
    verificarCodigoDisponible,
    generateCode,
    inputCodigoRef,
    tabValue,
    setTabValue,
    modal,
    handleModal,
    dataError,
    isError
  }

  return <AddProductoContext.Provider value={values}>{children}</AddProductoContext.Provider>;
}

export default AddProductoProvider;
