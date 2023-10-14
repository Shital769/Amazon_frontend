import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function AdminRoute({ element: Element, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          userInfo && userInfo.isAdmin ? <Element {...props}></Element> : navigate("/signin")
        }
      ></Route>
    </Routes>
  );
}
