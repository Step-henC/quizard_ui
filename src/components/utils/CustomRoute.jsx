import React from "react";
import { Route } from "react-router-dom";

export default function CustomRoute({ component: C, appProps, ...rest }) {
  //this is to secure routes, troubleshoot another day
  return (
    <Route
      {...rest}
      element={(props) =>
        appProps.user.isLoggedIn ? (
          <C {...props} {...appProps} />
        ) : (
          <Route path="/" />
        )
      }
    />
  );
}
