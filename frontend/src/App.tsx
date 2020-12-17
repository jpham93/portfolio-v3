import React, { useEffect, useState } from 'react';
import './styles/global.scss';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

// Custom Components
import Menu from './components/menu/Menu';
import Home from './pages/home/Home';
import About from './pages/about/About';

// Models
import GridLinksModel from './models/GridLinks.model';

const App: React.FunctionComponent = () => {

  // State - Load data
  const [menuProps, setMenuProps]   = useState<{
    // Note, not using Model here, because isFooter is hardcoded in JSX
    Brand : {
      firstname: string, lastname: string
    },
    Links: {
      name: string,
      path?: string
    }[],
    color?: string,
    alt_color?: string
  } | null>(null);
  const [loading, setLoading]       = useState<boolean>(true);
  const [gridLinks, setGridLinks]   = useState<{ gridLinks: GridLinksModel[] }|null>(null);

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
            Links,
          } = data;

        // load menuProps
        setMenuProps({
          Brand,
          Links,
          color:        data.hasOwnProperty('color') ? data.color : null,
          alt_color:    data.hasOwnProperty('color') ? data.alt_color : null
        });

        // load grid Links for "Home" page
        const gLinks = Links.map((link: any) => ({
          name:       link.name,
          alt_title:  link.hasOwnProperty('alt_title') ? link.alt_title :  null,
          path:       link.hasOwnProperty('path') ? link.path : null,
          link_img:   link.hasOwnProperty('link_img') ? link.link_img : null,
          color:      link.hasOwnProperty('color') ? link.color : null
        }));
        //@todo - refactor the nested arr inside object. This is due to a TS workaround for defining FC props...
        setGridLinks({ gridLinks: gLinks });

        // finish page load
        setLoading(false)

      });
  }, []);

  return (
    <Router>
      <div className="App" id={ "OuterContainer" }>
        {
          loading
            ?
            <h2>Loading...</h2>
            :
            <>
              <Menu {...{ ...menuProps!, inFooter: false }} />
              <div id={ "PageWrap" }>
                <Switch>
                  <Route exact path='/' >
                    <Home {...gridLinks!} />
                  </Route>
                  <Route path='/about' >
                    <About />
                  </Route>
                </Switch>
              </div>
              <Menu {...{ ...menuProps!, inFooter: true }} />
            </>
        }
      </div>
    </Router>
  );
};

export default App;
