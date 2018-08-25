import React, { Component } from 'react';
import {Route,Switch,BrowserRouter as Router} from 'react-router-dom';
import style from './App.scss';
import Home from './components/home';
import Battle from './components/Battle';
import NotFound from './components/NotFound';
import CustomNav  from './components/CustomNav';
import Popular from './components/Popular';
import Result from './components/Result';

export default  class App extends Component {

  render() {
    return (
      <div className={style.App}>
        <Router>
          <div className={style.SiteContainer}>

            <CustomNav/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/battle' component={Battle} />
              <Route path='/battle/results' component={Result} />
              <Route path='/popular' component={Popular} />
              <Route render={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
