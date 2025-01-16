import { Button } from "@mui/material";
import useHook from "../useHook";

function AgregarBtn() {
  const { inputCodigoRef, consultarCodigoInsertar } = useHook();

  const handleClick = () => {
    if (inputCodigoRef.current) {
      consultarCodigoInsertar(inputCodigoRef.current.value);
      inputCodigoRef.current.value = "";
      inputCodigoRef.current.focus();
    }
  };

  return (
    <Button color="secondary" variant="outlined" size="large" fullWidth sx={{ padding: 2 }} onClick={handleClick}>
      Agregar item
    </Button>
  );
}

export default AgregarBtn;
