import React, { FC, ReactElement, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch } from "react-router-dom";
import { Context } from "src/index";
import { authRoutes, publicRoutes } from "src/routes";
import { LOGIN_ROUTE } from "src/utils/constants";

const AppRouter: FC = observer((): ReactElement => {
  const { user } = useContext(Context);

  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
