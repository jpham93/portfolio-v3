import React from 'react';
import './App.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const App = () => {

  const homeData = fetch('http://localhost:1337');

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
