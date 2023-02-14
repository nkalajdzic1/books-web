import { FunctionComponent } from "react";
import styled from "styled-components";

import { Button, Input, Page } from "lib/components";
import { H3, Label } from "lib/components/typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;

  width: 33%;

  & > input {
    width: clamp(300px, 80%, 500px);
  }

  button {
    margin-top: 20px;
    width: clamp(200px, 50%, 300px);
  }
`;

const RegisterPage: FunctionComponent = () => {
  return (
    <Page>
      <Wrapper>
        <H3>Register</H3>
        <Label>Email</Label>
        <Input name="email" />
        <Label>Password</Label>
        <Input name="password" />
        <Label>Confirm password</Label>
        <Input name="confirmPassword" />
        <Button>SUBMIT</Button>
      </Wrapper>
    </Page>
  );
};

export default RegisterPage;
