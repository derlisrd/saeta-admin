import { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
  size?: number;
  color?: string;
}

function Icon({ children, size, color }: IconProps) {
  return <i className={`ti ti-${children}`} style={{ fontSize: size ?? 18, color: color }} />;
}

export default Icon;
