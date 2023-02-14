import { FunctionComponent, PropsWithChildren } from "react";
import styled from "styled-components";

import { mapStyles } from "lib/utils";

interface IStyledButton {
  variant: string;
}

const StyledButton = styled.button<IStyledButton>`
  ${({ theme, variant }) => mapStyles(theme.buttons[variant])};
  height: 53px;
  padding: 8px 16px;
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: bold;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export interface IButton {
  variant: string;
}

export const Button: FunctionComponent<PropsWithChildren & IButton> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  return (
    <StyledButton {...rest} variant={variant}>
      {children}
    </StyledButton>
  );
};
