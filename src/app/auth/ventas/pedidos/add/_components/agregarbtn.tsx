import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";

function AgregarButton() {
  const { inputCodigoRef, consultarCodigoInsertar } = useHook();

  const handleClick = () => {
    if (inputCodigoRef.current) {
      consultarCodigoInsertar(inputCodigoRef.current.value);
      inputCodigoRef.current.value = "";
      inputCodigoRef.current.focus();
    }
  };

  return (
    <Button variant="outlined" endIcon={<Icon name='shopping-cart-plus' />} fullWidth sx={{ padding: 1, display: { xs: 'none', md: 'block' } }} onClick={handleClick}>
      Agregar item
    </Button>
  );
}

export default AgregarButton;
