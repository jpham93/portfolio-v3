import React, { useState } from 'react';
import { slide as Menu } from "react-burger-menu";
import './ToggleMenu.module.scss';

//@TODO (Optional) - replace  react-burger-menu with Sidebar. Overlooked Primefaces documentation
const ToggleMenu = ( props: any ) => {

  const [open, setOpen] = useState(false);

  const handleOnOpen = () => {
    setOpen(true);
  }

  const handleOnClose = () => {
    setOpen(false);
  }

  const closeOnClick = () => {
    setOpen(false);
  }

  // Use DOM manipulation top close slider menu on link click
  const menuLinks = document.querySelectorAll('a.MenuLink');
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', () => {
      closeOnClick();
    })
  })

  return (
    <Menu
      // Pass on our props
      {...props.menuProps }
      right
      isOpen={ open }
      onOpen={ handleOnOpen }
      onClose={ handleOnClose }
    >
      { props.links }
    </Menu>
  );
};

export default ToggleMenu;
