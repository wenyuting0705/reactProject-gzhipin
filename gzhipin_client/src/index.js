import React from  'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import './assets/css/index.less'

import Login from './containers/login/login'
import Main from './containers/main/main'
import Register from './containers/register/register'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route component={Main}/>
      </Switch>
    </HashRouter>
  </Provider>
  ,document.getElementById('app'));