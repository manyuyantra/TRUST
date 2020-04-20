import React from "react";
import { Redirect, Route } from 'react-router-dom';
import auth from './auth';

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
        <Route {...props} render={(props) => {
            if (auth.isAuthenticated) {
                return <Component {...props}></Component>

            } else {
                return <Redirect to="/"></Redirect>
            }


        }} ></Route>
    )
}
