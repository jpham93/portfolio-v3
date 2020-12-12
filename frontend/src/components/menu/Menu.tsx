import React from 'react';
import MenuPropsModel from '../../models/MenuProps.model';
import { Toolbar, ToolbarProps } from 'primereact/toolbar';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

/**
 * Menu in header & footer. Displays links and branding.
 * @param Brand   - {firstname: string, lastname: string}
 * @param pages   -  {name: string, url_slug: string}[]
 */
const Menu = ({ Brand, pages }: MenuPropsModel) => {

  const MenuBrand = (props: ToolbarProps) => (
    <React.Fragment>
      <span>
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
        pages.map((page, index) => (
          <NavLink key={index} to={ '/' + page.url_slug } className="menu-link">
            { page.name }
          </NavLink>
        ))
      }
    </React.Fragment>
  );

  return(
    <div className="MenuWrapper">
      <Toolbar left={ MenuBrand } right={ MenuLinks } className="Menu" />
    </div>
  );
};

export default Menu;
