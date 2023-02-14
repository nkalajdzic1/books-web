import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 3rem 2rem;
`;

// Layout of the page, every page is wrapped with this component
export const Page: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
