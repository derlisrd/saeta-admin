
import { ThemeCustomContext } from "@/providers/ThemeCustomProvider";
import { useContext } from "react";

function useThemeCustom() {
  const context = useContext(ThemeCustomContext);

  if (context === undefined) {
    throw new Error("useThemeCustom debe estar definido");
  }
  return context;
}

export default useThemeCustom;
