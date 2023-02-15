import { FunctionComponent } from "react";
import styled from "styled-components";

import { ROUTE_PATHS } from "lib/constants";

import { Page } from "./Page";
import { H1, H5 } from "./typography";
import { Link } from "./Link";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

export const AccessDeniedPage: FunctionComponent = () => {
  return (
    <Page>
      <Wrapper>
        <H1>Access denied</H1>
        <H5>
          You need to login. Click <Link to={ROUTE_PATHS.LOGIN}>here</Link> to
          log in.
        </H5>
      </Wrapper>
    </Page>
  );
};
