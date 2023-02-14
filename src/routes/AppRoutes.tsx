import { FunctionComponent, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LoadingPage, Page404 } from "lib/components";
import { ROUTE_PATHS } from "lib/constants";

// Devices won't be lazy loaded, it is the landing page - the most visited page
import { HomePage } from "features/Books/HomePage";
// lazy load routes
const MyBooksPage = lazy(() => import("features/Books/MyBooksPage"));

const ROUTES = {
  HOME: {
    path: ROUTE_PATHS.HOME,
    exact: true,
    element: <HomePage />,
  },
  MY_BOOKS: {
    path: ROUTE_PATHS.MY_BOOKS,
    exact: true,
    element: <MyBooksPage />,
  },
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    exact: true,
    element: <Page404 />,
  },
};

const routesArr = Object.values(ROUTES);

const AppRoutes: FunctionComponent = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Router>
        <Routes>
          {routesArr.map((x, i) => (
            <Route key={`route-${i}`} {...x} />
          ))}
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
