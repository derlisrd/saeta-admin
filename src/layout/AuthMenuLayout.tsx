import Icon from "@/components/ui/icon";
import MenuNavList from "./components/MenuNavList";
import useDrawerMenu from "@/hooks/useDrawerMenu";

import { Drawer, Box, Toolbar, Stack, IconButton, Tooltip, Typography } from "@mui/material";
import { NavigateOptions, Outlet, To, useLocation, useNavigate } from "react-router-dom";
import DrawerTheme from "./components/DrawerTheme";

function AuthMenuLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpenMenu, toggleMenu, isOpenMobileMenu, toggleMobileMenu, DRAWER_WIDTH, isOpenConfigDrawer, toggleConfigDrawer } = useDrawerMenu();



  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : "0";
  let width_main = isOpenMenu ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%";

  const navegar = (to: To, isMobile: boolean, options?: NavigateOptions) => {
    navigate(to, options);
    isMobile && toggleMobileMenu();
  };
  const signOut = () => navigate("/logout");

  const TopBar = () => {
    return (
      <Toolbar
        component="header"
        sx={{ position: "fixed", display: "flex", width: "100%", zIndex: 1100, backdropFilter: "blur(5px)", alignItems: "center", padding: "0 !important" }}
      >
        <Stack justifyContent="space-between" flexDirection="row" width="100%" alignItems="center">
          <Stack flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
            <IconButton onClick={toggleMobileMenu} sx={{ width: "50px", height: "50px", display: { xs: "block", md: "none" } }}>
              <Icon>menu-2</Icon>
            </IconButton>
            <Tooltip placement="bottom" arrow title={isOpenMenu ? "Cerrar menú" : "Abrir menú"}>
              <IconButton onClick={toggleMenu} sx={{ width: "50px", height: "50px", marginLeft: margin_left, display: { xs: "none", md: "block", transition: "all 0.2s" } }}>
                <Icon size={24}>{isOpenMenu ? "chevron-left" : "arrow-narrow-right"}</Icon>
              </IconButton>
            </Tooltip>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {location.state?.descripcion || ""}
            </Typography>
          </Stack>

          <Stack flexDirection="row">

            <Tooltip placement="bottom" arrow title="Configuraciones">
              <IconButton onClick={toggleConfigDrawer}>
                <Icon>settings-code</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip placement="bottom" arrow title="Cerrar sesión">
              <IconButton onClick={signOut}>
                <Icon>door-exit</Icon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Toolbar>
    );
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        open={isOpenMenu}
        onClose={toggleMenu}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
          },
        }}
      >
        <MenuNavList navegar={navegar} />
      </Drawer>
      <Drawer
        variant="temporary"
        closeAfterTransition
        open={isOpenMobileMenu}
        onClose={toggleMobileMenu}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { bosmizing: "border-box", width: 256 },
        }}
      >
        <MenuNavList navegar={navegar} isMobile />
      </Drawer>
      <DrawerTheme isOpen={isOpenConfigDrawer} handleIsOpen={toggleConfigDrawer} />
      <TopBar />
      <Box sx={{ paddingTop: 8, paddingLeft: 2, paddingRight: 2, width: { md: width_main }, marginLeft: { md: margin_left }, transition: "all 0.2s" }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default AuthMenuLayout;
