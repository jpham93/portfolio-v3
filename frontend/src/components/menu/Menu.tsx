import React from 'react';
import MenuPropsModel from '../../models/MenuProps.model';
import { Menu as PrimeMenu } from 'primereact/menu';

/**
 * Menu
 * Menu in header & footer. Displays links and branding.
 * @param Brand   - {firstname: string, lastname: string}
 * @param pages   -  {name: string, url_slug: string}[]
 */
const Menu = ({ Brand, pages }: MenuPropsModel) => {
  return(
    <PrimeMenu>

    </PrimeMenu>
  );
};

export default Menu;
