import { useTypedSelector } from "./hooks/useTypedSelector";
import { authRoutes, publicRoutes } from "src/RoutesList";
import { MainLoader } from "src/components";
import { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { webAppRoutes } from "./constants";
import { MainLayout } from "./layouts/Main/MainLayout";

export function Routes(): JSX.Element {
  const { isAuth, isLoading } = useTypedSelector((state) => state.auth);

  return (
    <Suspense fallback={<MainLoader fullContent />}>
      <MainLayout>
        {isAuth ? (
          <Switch>
            {authRoutes.map(({ path, exact, Component }) => (
              <Route path={path} exact={exact} component={Component} key={path} />
            ))}
            <Redirect to={webAppRoutes.base} />
          </Switch>
        ) : (
          <Switch>
            {publicRoutes.map(({ path, exact, Component }) => (
              <Route path={path} exact={exact} component={Component} key={path} />
            ))}
            <Redirect to={webAppRoutes.auth} />
          </Switch>
        )}
      </MainLayout>
    </Suspense>
  );
}
