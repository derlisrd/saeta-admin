import { useState } from "react";

function useAddProducto() {
    
    const [form,setForm] = useState({
        impuesto_id:0,
        codigo:'',
        nombre:'',
        costo:0,
        precio_normal:0,
        precio_minimo:0,
        disponible:1,
        tipo:1,
        cantidad_minima:0
      });
    const [error,setError] = useState({code:0,message:''});

    const clearError = () => setError({code:0,message:''});
    
    const changeByName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = event.target
        setForm({...form,[name]:value})
    }


    return { form, setForm, clearError, error, changeByName }
}

export default useAddProducto;