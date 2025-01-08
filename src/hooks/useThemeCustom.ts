import ThemeCustomContext from "@/contexts/ThemeCustomContext";
import { useContext } from "react";

function useThemeCustom() {
    const {toggleModeDark,modeDark, customTheme, changeColor} = useContext(ThemeCustomContext)
    return {toggleModeDark,modeDark, customTheme, changeColor}
}

export default useThemeCustom;