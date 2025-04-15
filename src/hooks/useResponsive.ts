import { useMediaQuery, useTheme } from "@mui/material";

export interface ResponsiveBreakpoints {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isXsDown: boolean;
  isSmDown: boolean;
  isMdDown: boolean;
  isLgDown: boolean;
  isXlDown: boolean;
  isXsUp: boolean;
  isSmUp: boolean;
  isMdUp: boolean;
  isLgUp: boolean;
  isXlUp: boolean;
}

/**
 * Hook personalizado para gestionar consultas de medios responsivos
 * @returns Un objeto con todos los breakpoints disponibles
 */
function useResponsive(): ResponsiveBreakpoints {
  const theme = useTheme();
  
  // Detectar exactamente en qué breakpoint estamos
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  // Detectar "down" (este punto y cualquiera más pequeño)
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const isXlDown = useMediaQuery(theme.breakpoints.down('xl'));
  
  // Detectar "up" (este punto y cualquiera más grande)
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  
  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXsDown,
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,
    isXsUp,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp
  };
}

export default useResponsive;