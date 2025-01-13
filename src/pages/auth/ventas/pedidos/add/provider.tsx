import { createContext, ReactNode, useState } from "react";

interface AddPedidoContextProps {
  modal: {
    main: boolean;
    clientes: boolean;
  };
  handleModal: (name: string, value: boolean) => void;
}

export const AddPedidoContext = createContext<AddPedidoContextProps>({
  modal: {
    main: true,
    clientes: false,
  },
  handleModal: () => {},
});

interface AddPedidoProviderProps {
  children: ReactNode;
}

function AddPedidoProvider({ children }: AddPedidoProviderProps) {
  const [modal, setModal] = useState({
    main: true,
    clientes: false,
  });

  const handleModal = (name: string, value: boolean) => {
    setModal({ ...modal, [name]: value });
  };

  const values = { modal, handleModal };
  return <AddPedidoContext.Provider value={values}>{children}</AddPedidoContext.Provider>;
}

export default AddPedidoProvider;
