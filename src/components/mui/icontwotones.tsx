import { Icon, IconOwnProps } from "@mui/material";
import { ReactNode } from "react";

interface IconTwotonesProps extends IconOwnProps {
  children: ReactNode;
}
function IconTwoTones({ children, ...rest }: IconTwotonesProps) {
  return (
    <Icon {...rest} className="material-icons-two-tone">
      {children}
    </Icon>
  );
}

export default IconTwoTones;
