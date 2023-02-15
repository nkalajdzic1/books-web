import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { Button, FormField, Link, Page } from "lib/components";
import { H3, Label } from "lib/components/typography";
import { ROUTE_PATHS } from "lib/constants";
import { Token } from "lib/utils";

import { useLogin } from "./useLogin";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  margin-top: 10%;

  width: 33%;

  & > div > input {
    width: clamp(300px, 80%, 500px);
  }

  button {
    margin-top: 20px;
    width: clamp(200px, 50%, 300px);
  }
`;

const LinkWrapper = styled.div`
  margin-top: 20px;
  color: ${({ theme }) => theme.gray};
`;

export type UserLoginData = {
  email: string;
  password: string;
};

const defaultValues: UserLoginData = {
  email: "",
  password: "",
};

const LOGIN_SCHEMA = object().shape({
  email: string()
    .email("Invalid email format")
    .max(50, "50")
    .required("Email is required"),
  password: string().max(50, "50").required("Password is required"),
});

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const { loginAsync } = useLogin();

  const formValues = useForm<UserLoginData>({
    defaultValues,
    resolver: yupResolver(LOGIN_SCHEMA),
    mode: "onTouched",
    criteriaMode: "all",
  });

  const onSave: SubmitHandler<UserLoginData> = async (values): Promise<any> => {
    await loginAsync({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (!Token.isTokenValid()) return;

    navigate(ROUTE_PATHS.HOME);
  }, [navigate]);

  return (
    <Page>
      <FormProvider {...formValues}>
        <FormWrapper onSubmit={formValues.handleSubmit(onSave)}>
          <H3>Login</H3>
          <Label>Email</Label>
          <FormField name="email" />
          <Label>Password</Label>
          <FormField name="password" type="password" />
          <Button type="submit">SUBMIT</Button>
          <LinkWrapper>
            Don't have an account? Click{" "}
            <Link to={ROUTE_PATHS.REGISTER}>here</Link> to register.
          </LinkWrapper>
        </FormWrapper>
      </FormProvider>
    </Page>
  );
};

export default LoginPage;
