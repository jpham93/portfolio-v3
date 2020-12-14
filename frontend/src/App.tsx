import React, { useEffect, useState } from 'react';
import './global.scss';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

// Custom Components
import Menu from './components/menu/Menu';
import Home from './pages/home/Home';

// Models
import MenuPropsModel from './models/MenuProps.model';

const App: React.FunctionComponent = () => {

  // State - Load data
  const [menuProps, setMenuProps]   = useState<MenuPropsModel | null>(null);
  const [loading, setLoading]       = useState<boolean>(true);

  // Load MENU UI data from API
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
            Links
          } = data;
        // load menuProps
        setMenuProps({ Brand, Links });

        // finish page load
        setLoading(false)

      });
  }, []);

  return (
    <Router>
      <div className="App">
        {
          loading
            ?
            <h2>Loading...</h2>
            :
            <>
              <Menu {...menuProps!} />
              <Switch>
                <Route exact path='/' >
                  <Home />
                </Route>
              </Switch>
            </>
        }
      </div>
    </Router>
  );
};

export default App;
