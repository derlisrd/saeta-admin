import useDrawerMenu from "@/hooks/useDrawerMenu";
import { Drawer, Toolbar, Icon, IconButton, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function AuthMenuLayout() {
  const { isOpenMenu, toggleMenu, isOpenMobileMenu, toggleMobileMenu, DRAWER_WIDTH } = useDrawerMenu();

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : "0";
  let width_main = isOpenMenu ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%";

  const TopBar = () => {
    return (
      <nav>
        <Toolbar
          component="header"
          sx={{ position: "fixed", display: "flex", width: "100%", zIndex: 1100, backdropFilter: "blur(5px)", alignItems: "center", padding: "0 !important" }}
        >
          <IconButton onClick={toggleMobileMenu} sx={{ minWidth: "50px", display: { xs: "block", md: "none" } }}>
            <Icon>menu</Icon>
          </IconButton>
          <IconButton onClick={toggleMenu} sx={{ minWidth: "50px", marginLeft: margin_left, display: { xs: "none", md: "block", transition: "all 0.2s" } }}>
            <Icon>menu</Icon>
          </IconButton>
        </Toolbar>
      </nav>
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
        <h1>menu</h1>
      </Drawer>
      <Drawer
        variant="temporary"
        open={isOpenMobileMenu}
        onClose={toggleMobileMenu}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { bosmizing: "border-box", width: 256 },
        }}
      >
        <h1>menu mobile</h1>
      </Drawer>
      <TopBar />
      <Box sx={{ paddingTop: "48px", paddingLeft: 2, width: { md: width_main }, marginLeft: { md: margin_left }, transition: "all 0.2s" }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default AuthMenuLayout;
