import { FunctionComponent } from "react";
import styled from "styled-components";

import { Page } from "./Page";
import { H1 } from "./typography";

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 60vh;
`;

export const Page404: FunctionComponent = () => {
  return (
    <Page>
      <Wrapper>
        <H1>404</H1>
      </Wrapper>
    </Page>
  );
};
