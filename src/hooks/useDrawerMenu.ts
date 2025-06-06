import { useState } from "react";

function useDrawerMenu() {

    const [DRAWER_WIDTH] = useState(210)
    const [ COLLAPSED_WIDTH] = useState(60)
    const [isOpenMenu,setIsOpenMenu] = useState(true)
    const [isOpenMobileMenu,setIsOpenMobileMenu] = useState(false)
    const [isOpenConfigDrawer, setIsOpenConfigDrawer] = useState(false);

    const toggleMenu = ()=> setIsOpenMenu(!isOpenMenu)
    const toggleMobileMenu = ()=> setIsOpenMobileMenu(!isOpenMobileMenu)
    const toggleConfigDrawer = () => setIsOpenConfigDrawer(!isOpenConfigDrawer);

  return { isOpenMenu, toggleMenu, toggleMobileMenu, isOpenMobileMenu, DRAWER_WIDTH, COLLAPSED_WIDTH, isOpenConfigDrawer, toggleConfigDrawer };
}

export default useDrawerMenu;