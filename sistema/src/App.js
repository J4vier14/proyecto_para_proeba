import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './componets/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Contenedor from './componets/Contenedor';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render = { props =>(<Login {...props}/>)}></Route>
          <Route path="/contenedor" exact render = { props =>(<Contenedor {...props}/>)}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
