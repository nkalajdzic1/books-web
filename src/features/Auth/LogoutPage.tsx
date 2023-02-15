import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Page } from "lib/components";
import { ROUTE_PATHS } from "lib/constants";
import { useAuthContext } from "lib/contexts";

export const LogoutPage = () => {
  const { isLoggedIn, removeToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTE_PATHS.LOGIN);
      return;
    }

    removeToken();
  }, [isLoggedIn, removeToken, navigate]);

  return <Page>Logging out...</Page>;
};

export default LogoutPage;
