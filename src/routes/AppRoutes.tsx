import { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AccessDeniedPage, LoadingPage, Page404 } from "lib/components";
import { ROUTE_PATHS } from "lib/constants";

import { GlobalErrorHandler } from "GlobalErrorHandler";
import PrivateRoute from "./PrivateRoute";

// lazy load routes
const HomePage = lazy(() => import("features/Books/HomePage"));
const LoginPage = lazy(() => import("features/Auth/LoginPage"));
const RegisterPage = lazy(() => import("features/Auth/RegisterPage"));
const MyBooksPage = lazy(() => import("features/Books/MyBooksPage"));
const LogoutPage = lazy(() => import("features/Auth/LogoutPage"));

const ROUTES = {
  HOME: {
    path: ROUTE_PATHS.HOME,
    exact: true,
    isPrivate: true,
    element: <PrivateRoute element={HomePage} />,
  },
  LOGIN: {
    path: ROUTE_PATHS.LOGIN,
    exact: true,
    isPrivate: false,
    element: <LoginPage />,
  },
  REGISTER: {
    path: ROUTE_PATHS.REGISTER,
    exact: true,
    isPrivate: false,
    element: <RegisterPage />,
  },
  MY_BOOKS: {
    path: ROUTE_PATHS.MY_BOOKS,
    exact: true,
    isPrivate: false,
    element: <MyBooksPage />,
  },
  ACCESS_DENIED: {
    path: ROUTE_PATHS.ACCESS_DENIED,
    exact: true,
    isPrivate: false,
    element: <AccessDeniedPage />,
  },
  LOGOUT: {
    path: ROUTE_PATHS.LOGOUT,
    exact: true,
    isPrivate: true,
    element: <LogoutPage />,
  },
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    exact: true,
    isPrivate: false,
    element: <Page404 />,
  },
};

const routesArr = Object.values(ROUTES);

const AppRoutes: FunctionComponent = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router>
        {/* must be rendered here inside the router because the error handler uses the router */}
        <GlobalErrorHandler>
          <Routes>
            {routesArr.map((x, i) => (
              <Route key={`route-${i}`} {...x} />
            ))}
          </Routes>
        </GlobalErrorHandler>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
