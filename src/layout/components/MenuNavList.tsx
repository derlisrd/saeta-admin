import "simplebar-react/dist/simplebar.min.css";
import { Fragment, useState } from "react";
import SimpleBar from "simplebar-react";
import { Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse, Typography, ListItemButtonBaseProps, Stack, Avatar, Tooltip } from "@mui/material";
import menu from "@/constants/menu";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import Icon from "@/components/ui/icon";

const MenuNavList = ({ isMobile = false, navegar, isOpenMenu = true }: { isMobile?: boolean; navegar: Function; isOpenMenu?: boolean }) => {
  const { pathname } = useLocation();
  const [lista, setLista] = useState(menu);
  const { userData } = useAuth();

  const SELECTED = {
    "&.Mui-selected": {
      borderRadius: isOpenMenu ? "0 18px 18px 0" : "10px",
      margin: "4px",
      borderLeftStyle: isOpenMenu ? "solid" : "none",
      background: "primary.main",
      borderLeftWidth: isOpenMenu ? "2px" : "0",
      borderLeftColor: "primary.main",
      div: { color: "primary.main" },
      span: { fontWeight: "normal" },
    },
    ":hover": {
      borderRadius: isOpenMenu ? "0 18px 18px 0" : "10px",
      background: "primary.main",
    },
    justifyContent: isOpenMenu ? "flex-start" : "center",
    padding: isOpenMenu ? undefined : "12px 0",
  } as ListItemButtonBaseProps["sx"];

  const openCollapseMenu = (sw: boolean, id: number) => {
    // Solo permitir colapsar/expandir si el menú está completamente abierto
    if (!isOpenMenu) return;

    let array = [...lista];
    let index = array.findIndex((e) => e.id === id);
    array[index].open = !sw;
    setLista(array);
  };

  return (
    <SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: "100vh" }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center", minHeight: isOpenMenu ? undefined : "70px" }}>
        {isOpenMenu ? (
          <Stack gap={1} mt={1} direction="column" alignItems="center" justifyContent="center" width="100%">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              SGA
            </Typography>
            <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
              <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }} />
              <Typography variant="caption">{userData && userData.user.name}</Typography>
            </Stack>
          </Stack>
        ) : (
          <Tooltip title="SGA" placement="right">
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }} />
          </Tooltip>
        )}
      </Toolbar>
      <List>
        {menu.map((e) => (
          <Fragment key={e.id}>
            {e.submenu != null ? (
              <Fragment>
                <ListItem disablePadding>
                  {isOpenMenu ? (
                    <ListItemButton onClick={() => openCollapseMenu(e.open, e.id)} sx={SELECTED}>
                      <ListItemIcon>
                        <Icon size={18} color="primary">
                          {e.icon}
                        </Icon>
                      </ListItemIcon>
                      <ListItemText primary={e.title} />
                      <Icon>{e.open ? `chevron-right` : `chevron-down`}</Icon>
                    </ListItemButton>
                  ) : (
                    <Tooltip title={e.title} placement="right">
                      <ListItemButton onClick={() => openCollapseMenu(e.open, e.id)} sx={SELECTED}>
                        <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                          <Icon size={18} color="primary">
                            {e.icon}
                          </Icon>
                        </ListItemIcon>
                      </ListItemButton>
                    </Tooltip>
                  )}
                </ListItem>
                {isOpenMenu && (
                  <Collapse in={e.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ paddingLeft: 1 }}>
                      {e.submenu.map((elem) => (
                        <ListItem disablePadding key={elem.id}>
                          <ListItemButton
                            sx={SELECTED}
                            selected={pathname === elem.url}
                            onClick={() => navegar(elem.url ?? "#", isMobile, { state: { descripcion: elem.descripcion } })}
                          >
                            <ListItemIcon>
                              <Icon>caret-right</Icon>
                            </ListItemIcon>
                            <ListItemText primary={elem.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Fragment>
            ) : (
              <ListItem disablePadding>
                {isOpenMenu ? (
                  <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile, { state: { descripcion: e.descripcion } })} sx={SELECTED}>
                    <ListItemIcon>
                      <Icon size={18} color="primary">
                        {e.icon}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText>{e.title}</ListItemText>
                  </ListItemButton>
                ) : (
                  <Tooltip title={e.title} placement="right">
                    <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile, { state: { descripcion: e.descripcion } })} sx={SELECTED}>
                      <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                        <Icon size={18} color="primary">
                          {e.icon}
                        </Icon>
                      </ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                )}
              </ListItem>
            )}
          </Fragment>
        ))}
      </List>
    </SimpleBar>
  );
};

export default MenuNavList;
