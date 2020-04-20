import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Portal from './Portal'
import LoginForm from './LoginForm';
import Banner from './Banner';
import Members from './Members';
import Reciept from './Reciept';
import Transactions from './Transactions';
import Account from './Account'; 
import ProtectedRoute from './protectedroute';
import auth from './auth';

function App(props) {
      return (
            <Router>
                  <Banner></Banner>
                  <Switch>
                        <Route render={( props)=>{if(auth.isAuthenticated){
                                  props.history.push("/main");
                                  return null;
                            }else{
                                  return <LoginForm {...props} auth={auth}></LoginForm> 
                            }
                            
                        }} auth={auth} path="/" exact ></Route>
                        
                        <ProtectedRoute path="/main" exact  component={Portal}></ProtectedRoute>
                        <ProtectedRoute  path ="/members" component={Members}></ProtectedRoute>
                        <ProtectedRoute  path ="/account" component={Account}></ProtectedRoute>
                        <ProtectedRoute  path ="/transactions" component={Transactions}></ProtectedRoute>
                        <ProtectedRoute  path ="/reciept" component={Reciept}></ProtectedRoute>
                        <ProtectedRoute path ="*" component={()=>"No DATA.."}></ProtectedRoute>
                  </Switch>

            </Router>

      );
}

export default App;
