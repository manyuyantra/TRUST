import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import protectedroute from './protectedroute';
import auth from './auth';
import Portal from './Portal'
import LoginForm from './LoginForm';
import Banner from './Banner';
import Members from './Members';
import Reciept from './Reciept';
import Transactions from './Transactions';
import Account from './Account'; 

function App() {
      return (
            <Router>
                  <Banner></Banner>
                  <Switch>
                        <Route path="/" exact  component={LoginForm}></Route>
                        <Route path="/main" exact  component={Portal}></Route>
                        <Route  path ="/members" component={Members}></Route>
                        <Route  path ="/account" component={Account}></Route>
                        <Route  path ="/transactions" component={Transactions}></Route>
                        <Route  path ="/reciept" component={Reciept}></Route>
                        <Route path ="*" render={()=>"No DATA.."}></Route>
                  </Switch>

            </Router>

      );
}

export default App;
