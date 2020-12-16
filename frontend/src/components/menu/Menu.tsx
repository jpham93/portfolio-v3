import React, { CSSProperties } from 'react';
import MenuPropsModel from '../../models/MenuProps.model';
import { Toolbar, ToolbarProps } from 'primereact/toolbar';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import validateColor from 'validate-color';

/**
 * Menu in header & footer. Displays links and branding.
 * @param Brand       -  {firstname: string, lastname: string}
 * @param pages       -  {name: string, url_slug: string}[]
 * @param inFooter
 * @param color
 * @param alt_color
 */
const Menu = ({ Brand, Links, inFooter, color, alt_color }: MenuPropsModel) => {

  const MenuBrand = (props: ToolbarProps) => (
    <React.Fragment>
      <span className="MenuBrand">
        { Brand.firstname.toUpperCase() }
        <strong>
          { Brand.lastname.toUpperCase() }
        </strong>
      </span>
    </React.Fragment>
  );

  const MenuLinks = () => (
    <React.Fragment>
      {
        Links.map((link, index) => {
          // consider for home path (no value)
          const path = link.path ? link.path : '';
          return (
            <NavLink key={ index } to={ `/${path}` } className="MenuLink" activeClassName="MenuLinkActive">
              { link.name }
            </NavLink>
          );
        })
      }
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

  console.log(inFooter);

  return(
    <div className="MenuWrapper" style={ menuStyle }>
      <Toolbar left={ MenuBrand } right={ MenuLinks } className="Menu" />
    </div>
  );
};

export default Menu;
