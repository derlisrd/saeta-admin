import { useState } from "react";

function useFinalizarPedido() {
    const initialError = { code: 0, message: "", active: false };
    const [error, setError] = useState(initialError);
    
    return {error,setError}
}

export default useFinalizarPedido