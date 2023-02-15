import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

import { Header } from "./Header";

const Wrapper = styled.div`
  margin: 3rem 2rem;
`;

export interface IPage extends PropsWithChildren {
  withHeader?: boolean;
}

// Layout of the page, every page is wrapped with this component
export const Page: FunctionComponent<IPage> = ({
  children,
  withHeader = true,
}) => {
  return (
    <Wrapper>
      {withHeader && <Header />}
      {children}
    </Wrapper>
  );
};
