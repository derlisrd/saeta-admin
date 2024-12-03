import ThemeTypeModeContext from "@/contexts/ThemeTypeModeContext";
import { useContext } from "react";

function useThemTypeMode() {
    const {toggleTheme,modeDark} = useContext(ThemeTypeModeContext)
    return {toggleTheme,modeDark}
}

export default useThemTypeMode;