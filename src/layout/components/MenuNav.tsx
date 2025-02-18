import "simplebar-react/dist/simplebar.min.css";
import { Fragment, useState } from "react";
import SimpleBar from "simplebar-react";
import { Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse, Icon, Typography, ListItemButtonBaseProps } from "@mui/material";
import menu from "@/constants/menu";
import { useLocation } from "react-router-dom";

const MenuNav = ({ isMobile = false, navegar }: { isMobile?: boolean; navegar: Function }) => {
  const { pathname } = useLocation();
  const [lista, setLista] = useState(menu);

  const SELECTED = {
    "&.Mui-selected": {
      borderRadius: "0 18px 18px 0",
      margin: "0",
      borderLeftStyle: "solid",
      background: "primary.main",
      borderLeftWidth: "4px",
      borderLeftColor: "primary.main",
      div: { color: "primary.main" },
      span: { fontWeight: "bold" },
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
        <Typography variant="button">SGA</Typography>
      </Toolbar>
      <List>
        {menu.map((e) => (
          <Fragment key={e.id}>
            {e.submenu != null ? (
              <Fragment>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => openCollapseMenu(e.open, e.id)} sx={SELECTED}>
                    <ListItemIcon>
                      <Icon>{e.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={e.title} />
                    <Icon>{e.open ? `expand_less` : `expand_more`} </Icon>
                  </ListItemButton>
                </ListItem>
                <Collapse in={e.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ paddingLeft: 1 }}>
                    {e.submenu.map((elem) => (
                      <ListItem disablePadding key={elem.id}>
                        <ListItemButton sx={SELECTED} selected={pathname === elem.url} onClick={() => navegar(elem.url ?? "#", isMobile)}>
                          <ListItemIcon>
                            <Icon>{elem.icon}</Icon>
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
                    <Icon>{e.icon}</Icon>
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

export default MenuNav;
