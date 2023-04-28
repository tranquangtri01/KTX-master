import { AUTH_PREFIX_PATH } from "configs/AppConfig";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginOne from "views/auth-views/authentication/login-1";
import RegisterOne from "views/auth-views/authentication/register-1";

export const AuthLayout = ({ setAuth, setIsAdmin }) => {
  return (
    <div className="auth-container">
      <Switch>
        <Route
          path={`${AUTH_PREFIX_PATH}/signin`}
          render={(props) => (
            <LoginOne {...props} setAuth={setAuth} setIsAdmin={setIsAdmin} />
          )}
        />
        <Route path={`${AUTH_PREFIX_PATH}/signup`} component={RegisterOne} />
        <Redirect
          from={`${AUTH_PREFIX_PATH}`}
          to={`${AUTH_PREFIX_PATH}/signin`}
        />
      </Switch>
    </div>
  );
};

export default AuthLayout;
