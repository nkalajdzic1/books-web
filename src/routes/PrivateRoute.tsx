import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { Token } from "lib/utils";
import { ROUTE_PATHS } from "lib/constants";

export interface IPrivateRoute extends PropsWithChildren {
  element: any;
}

export const PrivateRoute = ({
  element: Component,
  ...rest
}: IPrivateRoute) => {
  if (!Token.isTokenValid()) return <Navigate to={ROUTE_PATHS.ACCESS_DENIED} />;

  return <Component {...rest} />;
};

export default PrivateRoute;
