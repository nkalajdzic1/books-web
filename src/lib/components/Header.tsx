import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { ROUTE_PATHS } from "lib/constants";
import { useAuthContext } from "lib/contexts";

import { Menu } from "./Menu";

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 25px 25px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-family: "Megrim", cursive;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color};
`;

const linksForLoggedInUsers = [
  {
    name: "HOME",
    href: ROUTE_PATHS.HOME,
  },
  {
    name: "LOGOUT",
    href: ROUTE_PATHS.LOGOUT,
  },
];

const linksForGuestUsers = [
  {
    name: "HOME",
    href: ROUTE_PATHS.HOME,
  },
  {
    name: "LOGIN",
    href: ROUTE_PATHS.LOGIN,
  },
  {
    name: "REGISTER",
    href: ROUTE_PATHS.REGISTER,
  },
];

export const Header: FunctionComponent = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <HeaderWrapper>
      <StyledLink to={ROUTE_PATHS.HOME}>
        <Logo>My Books To Read</Logo>
      </StyledLink>
      <Menu
        side="right"
        links={isLoggedIn ? linksForLoggedInUsers : linksForGuestUsers}
      />
    </HeaderWrapper>
  );
};
