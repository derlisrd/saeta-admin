import { ReactNode } from "react";

function Title({ children }: { children?: ReactNode }) {
  return <h3>{children}</h3>;
}

export default Title;
