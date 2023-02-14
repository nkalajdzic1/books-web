import styled from "styled-components";

const Component = styled.input`
  padding: 10px;
  background-color: transparent;
  color: black;
  outline: 1px solid black;
  height: 50px;
`;

export const Input = (props: any) => {
  return <Component {...props} />;
};
