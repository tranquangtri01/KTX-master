import React, { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import useBodyClass from "hooks/useBodyClass";
import HomeLayout from "layouts/home-layout";

let checklg = window.localStorage.getItem("lg");
let rl = window.localStorage.getItem("rl");

export const Views = (props) => {
  const { locale, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  const [auth, setAuth] = useState(checklg !== null && rl === "ibmFt");
  const [isAdmin, setIsAdmin] = useState(checklg !== null && rl === "asibmFt");

  console.log("AUTH", auth, rl);

  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} setAuth={setAuth} setIsAdmin ={setIsAdmin} />
          </Route>
          <PrivateRoute path={APP_PREFIX_PATH} auth={auth}>
             <AppLayout direction={direction} location={location}  setAuth={setAuth} isAdmin = {isAdmin} />
          </PrivateRoute>
          <Route exact path="/">
            <HomeLayout />
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

function PrivateRoute({ children, path, auth, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={() => {
        return auth === true ? children : <Redirect to={AUTH_PREFIX_PATH} />;
      }}
    />
  );
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token } = auth;
  return { locale, token, direction };
};

export default withRouter(connect(mapStateToProps)(Views));
