import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Portal from "./Portal";
import LoginForm from "./LoginForm";
import Banner from "./Banner";
import Members from "./Members";
import Reciept from "./Reciept";
import Transactions from "./Transactions";
import Account from "./Account";
import ProtectedRoute from "./protectedroute";
import auth from "./auth";
import { withRouter } from "react-router";

function App(props) {
  React.useEffect(() => {
     props.history.listen((newLocation, action) => {
      if (action === "POP") {
        if (auth.isAuthenticated && newLocation.pathname === "/") {
          props.history.goForward();
        }
      }
    });

  },[props.history]);

  return (
    <>
      <Banner auth={auth}></Banner>
      <Switch>
        <Route
          render={(props) => {
            return <LoginForm {...props} auth={auth}></LoginForm>;
          }}
          auth={auth}
          path="/"
          exact
        ></Route>

        <ProtectedRoute path="/main" exact component={Portal}></ProtectedRoute>
        <ProtectedRoute path="/members" component={Members}></ProtectedRoute>
        <ProtectedRoute path="/account" component={Account}></ProtectedRoute>
        <ProtectedRoute
          path="/transactions"
          component={Transactions}
        ></ProtectedRoute>
        <ProtectedRoute path="/reciept" component={Reciept}></ProtectedRoute>
        <ProtectedRoute path="*" component={() => "No DATA.."}></ProtectedRoute>
      </Switch>
    </>
  );
}

export default withRouter(App);
