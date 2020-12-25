import React, { useRef, useState } from 'react';
import './Menu.scss';
import { Toolbar, ToolbarProps } from 'primereact/toolbar';
import { NavLink } from 'react-router-dom';
import MenuPropsModel from '../../models/MenuProps.model';
import validateColor from 'validate-color';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import ToggleMenu from '../toggleMenu/ToggleMenu';

/**
 * Menu in header & footer. Displays links and branding.
 * @param Brand       -  {firstname: string, lastname: string}
 * @param pages       -  {name: string, url_slug: string}[]
 * @param inFooter
 * @param color
 * @param alt_color
 */
const Menu = ({ Brand, Links, inFooter, color, alt_color }: MenuPropsModel) => {

  // Dynamic size tracking. @see - https://codesandbox.io/s/zw8kylol8m?file=/src/index.tsx:537-602 &
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ top: 0, left: 0 });

  // Optional callback to access the full DOMRect object if required.
  const optionalCallback = (entry: DOMRectReadOnly) =>
    setDimensions({ top: entry.x, left: entry.left });

  const [width, height] = useResizeObserver(ref, optionalCallback);

  const MenuLinks = () => (
      Links.map((link, index) => {
        // consider for home path (no value)
        const path = link.path ? link.path : '';
        return (
          <NavLink exact key={ index } to={ `/${path}` } className="MenuLink" activeClassName="MenuLinkActive" onClick={() => null}>
            { link.name }
          </NavLink>
        );
      })
    );

  // Special Top Menu Link configuration()
  const TopMenuLinks = width < 992
    ? () => <ToggleMenu menuProps={{ pageWrapId:"PageWrap", outerContainerId:"OuterContainer" }} links={MenuLinks()} />
    : MenuLinks;

  const MenuBrand = (props: ToolbarProps) => (
    <React.Fragment>
      <span className="MenuBrand">
        { Brand.firstname }
        <strong>
          { Brand.lastname }
        </strong>
      </span>
    </React.Fragment>
  );

  // dynamic color for Header/Footer Menu
  const menuStyle: React.CSSProperties = inFooter
    // Footer menu styling
    ? alt_color && validateColor(alt_color)
      ? { backgroundColor: alt_color, position: 'relative' }
      : { backgroundColor: 'var(--secondary-color)', position: 'relative' }
    // Header Color
    : color && validateColor(color)
      ? { backgroundColor: color, position: 'absolute' }
      : { backgroundColor: 'inherit', position: 'absolute' };

  return(
    <div className={`MenuWrapper ${inFooter && 'Footer'}`} id="PageWrap" style={ menuStyle } ref={ ref }>
      <Toolbar left={ MenuBrand } right={ !inFooter ? TopMenuLinks : MenuLinks } className="Menu Footer" />
    </div>
  );
};

export default Menu;
