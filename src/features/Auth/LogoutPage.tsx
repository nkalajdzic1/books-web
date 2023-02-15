import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Page } from "lib/components";
import { Token } from "lib/utils";
import { ROUTE_PATHS } from "lib/constants";

export const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Token.isTokenValid()) {
      navigate(ROUTE_PATHS.LOGIN);
      return;
    }

    Token.removeToken();
  }, [navigate]);

  return <Page>Logging out...</Page>;
};

export default LogoutPage;
