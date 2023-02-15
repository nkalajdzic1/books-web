import { FunctionComponent, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Component = styled(NavLink)``;

export interface ILink extends PropsWithChildren {
  to: string;
}

export const Link: FunctionComponent<ILink> = ({ to, children, ...rest }) => {
  return (
    <Component to={to} {...rest}>
      {children}
    </Component>
  );
};
