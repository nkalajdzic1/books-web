import { FunctionComponent, InputHTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form/dist/types";
import styled from "styled-components";

import { Label } from "./typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Component = styled.input`
  padding: 10px;
  background-color: transparent;
  color: black;
  outline: 1px solid black;
  height: 40px;
`;

const ErrorWrapper = styled(Label)`
  color: ${({ theme }) => theme.red};
  height: 20px;
`;

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  errors?: Object;
  componentRef?: RefCallBack;
}

export const Input: FunctionComponent<IInput> = ({
  errors = {},
  className,
  ...rest
}) => {
  return (
    <Wrapper className={className}>
      <Component {...rest} />
      <ErrorWrapper>{Object.values(errors)?.[0]}</ErrorWrapper>
    </Wrapper>
  );
};
