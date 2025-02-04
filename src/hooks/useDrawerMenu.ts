import { useState } from "react";

function useDrawerMenu() {

    const [DRAWER_WIDTH] = useState(200)

    const [isOpenMenu,setIsOpenMenu] = useState(true)
    const [isOpenMobileMenu,setIsOpenMobileMenu] = useState(false)
    
    const toggleMenu = ()=> setIsOpenMenu(!isOpenMenu)
    const toggleMobileMenu = ()=> setIsOpenMobileMenu(!isOpenMobileMenu)

    return {isOpenMenu, toggleMenu,toggleMobileMenu, isOpenMobileMenu, DRAWER_WIDTH}
}

export default useDrawerMenu;