import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/invoice`} component={lazy(() => import(`./invoice`))} />  
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/bill`} component={lazy(() => import(`./bill`))} /> 
        <Route path={`${APP_PREFIX_PATH}/room`} component={lazy(() => import(`./room`))} /> 
        <Route path={`${APP_PREFIX_PATH}/room-type`} component={lazy(() => import(`./roomType`))} />
        <Route path={`${APP_PREFIX_PATH}/campus`} component={lazy(() => import(`./campus`))} />
        <Route path={`${APP_PREFIX_PATH}/student-register`} component={lazy(() => import(`./register`))} />
        <Route path={`${APP_PREFIX_PATH}/student`} component={lazy(() => import(`./student`))} />
        <Route path={`${APP_PREFIX_PATH}/manager`} component={lazy(() => import(`./manager`))} />
        <Route path={`${APP_PREFIX_PATH}/setting`} component={lazy(() => import(`./setting`))} />
        <Route path={`${APP_PREFIX_PATH}/shop`} component={lazy(() => import(`./e-commerce`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);