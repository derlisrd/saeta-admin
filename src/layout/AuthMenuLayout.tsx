import { Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";

function AuthMenuLayout() {
  return (
    <main>
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: false,
        }}
      />
      <Outlet />
    </main>
  );
}

export default AuthMenuLayout;
