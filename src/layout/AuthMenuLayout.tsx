import MenuNavList from "./components/MenuNavList";
import useDrawerMenu from "@/hooks/useDrawerMenu";
import useThemTypeMode from "@/hooks/useThemeCustom";

import { Drawer, Box, Toolbar, Stack, Icon, IconButton, Tooltip } from "@mui/material";
import { NavigateOptions, Outlet, To, useNavigate } from "react-router-dom";

function AuthMenuLayout() {
  const navigate = useNavigate();
  const { isOpenMenu, toggleMenu, isOpenMobileMenu, toggleMobileMenu, DRAWER_WIDTH } = useDrawerMenu();

  const { toggleModeDark, modeDark } = useThemTypeMode();

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
          <IconButton onClick={toggleMobileMenu} sx={{ minWidth: "50px", display: { xs: "block", md: "none" } }}>
            <Icon color="primary">arrow_forward_ios</Icon>
          </IconButton>
          <IconButton onClick={toggleMenu} sx={{ minWidth: "50px", marginLeft: margin_left, display: { xs: "none", md: "block", transition: "all 0.2s" } }}>
            <Icon color="primary">{isOpenMenu ? "arrow_forward_ios" : "arrow_back_ios"}</Icon>
          </IconButton>
          <Stack flexDirection="row">
            <IconButton onClick={toggleModeDark}>
              <Tooltip placement="bottom" arrow title="Cambiar tema">
                <Icon>{modeDark ? "toggle_on" : "toggle_off"}</Icon>
              </Tooltip>
            </IconButton>
            <IconButton onClick={signOut}>
              <Tooltip placement="bottom" arrow title="Cerrar sesión">
                <Icon>exit_to_app</Icon>
              </Tooltip>
            </IconButton>
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
      <TopBar />
      <Box sx={{ paddingTop: "48px", paddingLeft: 2, paddingRight: 2, width: { md: width_main }, marginLeft: { md: margin_left }, transition: "all 0.2s" }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default AuthMenuLayout;
