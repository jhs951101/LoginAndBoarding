import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from './components/views/Header/Header';
import EmptyPage from './components/views/EmptyPage/EmptyPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import BoardListPage from './components/views/BoardListPage/BoardListPage';
import BoardInfoPage from './components/views/BoardInfoPage/BoardInfoPage';
import WritePage from './components/views/WritePage/WritePage';
import Auth from './hoc/auth'

function App() {
  return (
    <div>
      <Router>
        <Header/>
          <Switch>
            <Route exact path="/" component={Auth(EmptyPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/boardlist" component={Auth(BoardListPage, true)} />
            <Route exact path="/boardinfo" component={Auth(BoardInfoPage, true)} />
            <Route exact path="/write" component={Auth(WritePage, true)} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;