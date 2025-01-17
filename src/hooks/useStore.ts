import { useState, useEffect } from "react";

export const useStore = <T,>(key: string, initialValue: T) => {
  // Estado que almacena el valor actual del localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  // Función para actualizar `localStorage` y el estado
  const setItemValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  // Función para eliminar el valor en `localStorage`
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue); // Reinicia al valor inicial
    } catch (error) {
      console.error("Error removing localStorage:", error);
    }
  };

  // Efecto para sincronizar cambios en `localStorage`
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue]);

  return { current: storedValue, setItemValue, removeItem };
};

export default useStore;
