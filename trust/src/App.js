import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import protectedroute from './protectedroute';
import auth from './auth';
import Portal from './Portal'
import LoginForm from './LoginForm';
import Banner from './Banner'

function App() {
      return (
            <Router>
                  <Banner></Banner>
                  <Switch>
                        <Route path="/" exact render={(props) => {
                              return (
                                    <LoginForm {...props}></LoginForm>

                              )
                        }}></Route>
                        <Route path="/main" render={() => {
                              return <Portal />
                        }}></Route>
                  </Switch>

            </Router>

      );
}

export default App;
