import { useEffect, useState } from "react";
import styled from "styled-components";

import { Input, Page } from "lib/components";
import { H2 } from "lib/components/typography";
import { useQueryParams } from "lib/hooks";

import { useSearchBooks } from "./useSearchBooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
`;

const StyledInput = styled(Input)`
  margin-top: 50px;
  width: 50%;
`;

export const HomePage = () => {
  const [searchInputVal, setSearchInputVal] = useState<string>("");

  const [{ pageNumber }, , { search, onSearch }] = useQueryParams();

  const { data: books } = useSearchBooks({
    q: search,
    page: pageNumber,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchInputVal);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [searchInputVal, onSearch]);

  console.log(books);

  return (
    <Page>
      <Wrapper>
        <H2>Search books</H2>
        <StyledInput
          placeholder="Search books..."
          value={searchInputVal}
          onChange={(e) => setSearchInputVal(e.target.value)}
        />
        {/**
         *
         * Add virtuoso here:
         *
         */}
      </Wrapper>
    </Page>
  );
};

export default HomePage;
