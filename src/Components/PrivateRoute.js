import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <Route
      {...rest}
      component={userInfo ? <Component /> : <Navigate to="/signin" />}
    ></Route>
  );
}
