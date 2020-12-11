import React, { useEffect, useState } from 'react';
import './App.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Custom Components
import Menu from './components/menu/Menu';

// Models
import MenuPropsModel from './models/MenuProps.model';

const App: React.FunctionComponent = () => {

  const [menuProps, setMenuProps] = useState<MenuPropsModel | null>(null);

  // Load UI data from API
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL!}/menu`)
      .then(res => res.json())
      .then(data => {
        
        /**
         * LOAD MENU PROPS
         */
        // extract data
        const {
          Brand,
          pages
        } = data;
        // repackage pages into the accepted MenuProps property
        const menuPages = pages.map((page: {name: string, url_slug: string | undefined}) => ({
          name: page.name, url_slug: page.url_slug
        }));
        // load menuProps
        setMenuProps({ Brand, pages: menuPages });

      });
  }, []);

  return (
    <div className="App">
      <Menu {...menuProps!} />
      <Router>
        <Switch>
          <Route exact path='/'>

          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
