import "simplebar-react/dist/simplebar.min.css";
import { Fragment, useState } from "react";
import SimpleBar from "simplebar-react";
import { Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse, Typography, ListItemButtonBaseProps, Stack, Avatar } from "@mui/material";
import menu from "@/constants/menu";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import Icon from "@/components/ui/icon";

const MenuNavList = ({ isMobile = false, navegar }: { isMobile?: boolean; navegar: Function }) => {
  const { pathname } = useLocation();
  const [lista, setLista] = useState(menu);
  const { userData } = useAuth();

  const SELECTED = {
    "&.Mui-selected": {
      borderRadius: "0 18px 18px 0",
      margin: "0",
      borderLeftStyle: "solid",
      background: "primary.main",
      borderLeftWidth: "4px",
      borderLeftColor: "primary.main",
      div: { color: "primary.main" },
      span: { fontWeight: "normal" },
    },
    ":hover": {
      borderRadius: "0 18px 18px 0",
      background: "primary.main",
    },
  } as ListItemButtonBaseProps["sx"];

  const openCollapseMenu = (sw: boolean, id: number) => {
    let array = [...lista];
    let index = array.findIndex((e) => e.id === id);
    array[index].open = !sw;
    setLista(array);
  };

  return (
    <SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: "100vh" }}>
      <Toolbar>
        <Stack gap={1} mt={1} direction="column" alignItems="center" justifyContent="center" width="100%">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            SGA
          </Typography>
          <Stack direction="column" justifyContent="center" alignItems="center" gap={1}>
            <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }} />
            <Typography variant="caption">{userData && userData.user.name}</Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <List>
        {menu.map((e) => (
          <Fragment key={e.id}>
            {e.submenu != null ? (
              <Fragment>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => openCollapseMenu(e.open, e.id)} sx={SELECTED}>
                    <ListItemIcon>
                      <Icon size={18} color="primary">
                        {e.icon}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText primary={e.title} />
                    <Icon>{e.open ? `chevron-right` : `chevron-down`}</Icon>
                  </ListItemButton>
                </ListItem>
                <Collapse in={e.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ paddingLeft: 1 }}>
                    {e.submenu.map((elem) => (
                      <ListItem disablePadding key={elem.id}>
                        <ListItemButton sx={SELECTED} selected={pathname === elem.url} onClick={() => navegar(elem.url ?? "#", isMobile)}>
                          <ListItemIcon>
                            <Icon>circle</Icon>
                          </ListItemIcon>
                          <ListItemText primary={elem.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            ) : (
              <ListItem disablePadding>
                <ListItemButton selected={pathname === e.url} onClick={() => navegar(e.url ?? "#", isMobile)} sx={SELECTED}>
                  <ListItemIcon>
                    <Icon size={18} color="primary">
                      {e.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText>{e.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </Fragment>
        ))}
      </List>
    </SimpleBar>
  );
};

export default MenuNavList;
