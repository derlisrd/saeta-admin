import { Button, ButtonProps, styled } from "@mui/material";

interface LargeButtonProps extends ButtonProps {
  // Aquí puedes agregar propiedades personalizadas si las tuvieras
}

const LargeButton = styled(Button)<LargeButtonProps>((/* { theme } */) => ({
  padding: "16px 24px",
  // Aquí puedes agregar más estilos si lo deseas
}));

// El componente ButtonStyled acepta LargeButtonProps
function ButtonStyled(props: LargeButtonProps) {
  return <LargeButton {...props}>{props.children}</LargeButton>;
}

export default ButtonStyled;
