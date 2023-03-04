import { FunctionComponent } from "react";
import styled from "styled-components";

import { IBookModel } from "./interfaces";

// we cannot use margins because it
const Wrapper = styled.div`
  padding: 5px;
  border: 2px solid ${({ theme }) => theme.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 300px;
  margin: 0 auto;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const StyledLabel = styled.label`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 275px;
`;

export interface IBook {
  book: IBookModel;
}

export const Book: FunctionComponent<IBook> = ({ book }) => {
  return (
    <Wrapper>
      <Img
        alt={book.title}
        loading="lazy"
        src={`https://covers.openlibrary.org/b/lccn/${book.lccns?.[0]}-M.jpg`}
      />
      <StyledLabel style={{ marginTop: 10 }}>Title: {book.title}</StyledLabel>
      <StyledLabel>Author: {book.authors[0] || "/"}</StyledLabel>
    </Wrapper>
  );
};
