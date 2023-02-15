import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { Button, FormField, Link, Page } from "lib/components";
import { H3, Label } from "lib/components/typography";
import { ROUTE_PATHS } from "lib/constants";
import { useAuthContext } from "lib/contexts";

import { useRegister } from "./useRegister";

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

export type UserRegisterData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultValues: UserRegisterData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const LOGIN_SCHEMA = object().shape({
  email: string()
    .email("Invalid email format")
    .max(50, "50")
    .required("Email is required"),
  password: string().max(50, "50").required("Password is required"),
  confirmPassword: string()
    .max(50, "50")
    .required("Confirm password is required")
    .test(
      "doesItMatch",
      "Passwords don't match",
      (value, ctx) => ctx.parent.password === value
    ),
});

const RegisterPage: FunctionComponent = () => {
  const { isLoggedIn } = useAuthContext();

  const navigate = useNavigate();

  const { registerAsync, isLoading } = useRegister();

  const formValues = useForm<UserRegisterData>({
    defaultValues,
    resolver: yupResolver(LOGIN_SCHEMA),
    mode: "onTouched",
    criteriaMode: "all",
  });

  const onSave: SubmitHandler<UserRegisterData> = async (
    values: UserRegisterData
  ): Promise<any> => {
    await registerAsync({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    navigate(ROUTE_PATHS.HOME);
  }, [isLoggedIn, navigate]);

  return (
    <Page>
      <FormProvider {...formValues}>
        <FormWrapper onSubmit={formValues.handleSubmit(onSave)}>
          <H3>Register</H3>
          <Label>Email</Label>
          <FormField name="email" />
          <Label>Password</Label>
          <FormField name="password" type="password" />
          <Label>Confirm password</Label>
          <FormField name="confirmPassword" type="password" />
          <Button type="submit">{isLoading ? "LOADING..." : "SUBMIT"}</Button>
          <LinkWrapper>
            Already have an account? Click{" "}
            <Link to={ROUTE_PATHS.LOGIN}>here</Link> to login.
          </LinkWrapper>
        </FormWrapper>
      </FormProvider>
    </Page>
  );
};

export default RegisterPage;
