// hooks/useCobroForm.ts
import { useState, useCallback } from "react";

interface CobroForm {
    forma_pago_id: number;
    monto: number;
}

export const useCobroForm = (initialValues: CobroForm = { forma_pago_id: 0, monto: 0 }) => {
    const [form, setForm] = useState<CobroForm>(initialValues);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<CobroForm>>({});

    const updateField = useCallback(<K extends keyof CobroForm>(
        field: K, 
        value: CobroForm[K]
    ) => {
        setForm(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo cuando se actualiza
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    }, [errors]);

    const validateForm = useCallback(() => {
        const newErrors: Partial<CobroForm> = {};
        
        if (form.forma_pago_id === 0) {
            newErrors.forma_pago_id = 0; // Indica que hay error
        }
        
        if (form.monto <= 0) {
            newErrors.monto = 0; // Indica que hay error
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [form]);

    const resetForm = useCallback(() => {
        setForm(initialValues);
        setErrors({});
    }, [initialValues]);

    return {
        form,
        errors,
        isSubmitting,
        setIsSubmitting,
        updateField,
        validateForm,
        resetForm,
        setForm
    };
};
