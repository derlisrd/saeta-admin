import { AddProducto } from "@/services/dto/productos/AddProducto";

export const validateForm = (form: AddProducto) => {
    let error = {
        code: 0,
        message: ""
    };
    const { codigo, nombre, precio_minimo, precio_normal, category_id, impuesto_id, medida_id, costo } = form;

  if (!codigo || codigo === "") {
      error = ({ code: 1, message: "El código es requerido" });
    return error;
    }
    if (!nombre) {
      error =({ code: 2, message: "El nombre es requerido" });
    return error;
    }
    if (impuesto_id === 0) {
      error = ({ code: 3, message: "Seleccione un impuesto" });
    return error;
    }
    if (category_id === 0) {
      error = ({ code: 4, message: "Seleccione una categoría" });
      return error
    }
    if (medida_id === 0) {
      error = ({ code: 5, message: "Seleccione una medida" });
    return error;
    }

    if (!costo) {
      error = ({ code: 6, message: "El costo es requerido" });
      return error
    }

    if (!precio_normal) {
      error = ({ code: 7, message: "El precio normal es requerido" });
    return error;
    }
    if (!precio_minimo) {
      error =({ code: 8, message: "El precio mínimo es requerido" });
      return error;
    }

    if(form.costo > form.precio_normal) {
      error = ({ code: 6, message: "El costo no puede ser mayor al precio normal" });
      return error;
    }

    if(form.stock<0){
      error = ({ code: 9, message: "El stock no puede ser negativo" });
      return error;
    }

    return error;
  }