import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import DefaultLayout from "../layouts/Default/index";

import { useProfile } from "../hooks/index";

interface LocationTypes {
  from?: Location;
}

const AuthProtected = (props: any) => {
  const { userProfile, loading } = useProfile();
  const [redirected, setRedirected] = React.useState<Boolean>(false);

  /*
    redirect is un-auth access protected routes via url
  */
  const location = useLocation<LocationTypes>();
  if (location?.state?.from?.pathname.startsWith("/auth-login/ey")) {
    setRedirected(true);
  }
  if (!userProfile && loading) {
    return (
      <>
        {true ? (
          <Redirect
            to={{ pathname: "/auth-login/:token", state: { from: location } }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/auth-login", state: { from: location } }}
          />
        )}
      </>
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
