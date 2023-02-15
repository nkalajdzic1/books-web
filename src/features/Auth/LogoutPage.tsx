import { useNavigate } from "react-router-dom";

import { Page } from "lib/components";
import { Token } from "lib/utils";
import { ROUTE_PATHS } from "lib/constants";

export const LogoutPage = () => {
  const navigate = useNavigate();

  if (!Token.isTokenValid()) {
    navigate(ROUTE_PATHS.LOGIN);
    return null;
  }

  Token.removeToken();

  return <Page>Logging out...</Page>;
};

export default LogoutPage;
