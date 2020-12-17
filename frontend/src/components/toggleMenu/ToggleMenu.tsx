import { slide as Menu } from "react-burger-menu";
import './ToggleMenu.scss';

const ToggleMenu = ( props: any ) => {
  return (
    // Pass on our props
    <Menu {...props.menuProps } right>
      { props.links }
    </Menu>
  );
};

export default ToggleMenu;
