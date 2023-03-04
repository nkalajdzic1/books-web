import { useCallback, useEffect, useRef, useState } from "react";
import { VirtuosoHandle } from "react-virtuoso";
import styled from "styled-components";

import { If, Input, Page, VirtualList } from "lib/components";
import { H2, H5 } from "lib/components/typography";
import { useQueryParams } from "lib/hooks";

import { useSearchBooks } from "./useSearchBooks";
import { Book } from "./Book";
import { IBookModel } from "./interfaces";

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
  const [books, setBooks] = useState<Array<IBookModel>>([]);

  const listRef = useRef<VirtuosoHandle>();

  const resetData = useCallback(() => {
    setBooks([]);
    listRef.current?.scrollToIndex({
      index: 0,
      align: "start",
      behavior: "auto",
    });
  }, []);

  const [{ pageNumber }, , { search, onSearch }] = useQueryParams(
    undefined,
    resetData
  );

  const { data, isLoading } = useSearchBooks({
    q: search.keyword,
    page: pageNumber,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch({ keyword: searchInputVal });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchInputVal, onSearch]);

  // pagination is not available for the search api, but lets still
  // write the code to see how it should be used
  const loadMore = (_index: number) => {
    if (data?.total <= data?.list?.length) return;

    // this is how we paginate, example
    // setPageNumber((prevVal: number) => prevVal + 1);
  };

  useEffect(() => {
    if (!data?.list?.length) return;

    setBooks((prevVal) => [...prevVal, ...data.list]);
  }, [data?.list]);

  return (
    <Page>
      <Wrapper>
        <H2>Search books</H2>
        <StyledInput
          placeholder="Search books..."
          value={searchInputVal}
          onChange={(e) => setSearchInputVal(e.target.value)}
        />
        <If predicate={books.length === 0 && !isLoading}>
          <H5>No results, try another search</H5>
        </If>
      </Wrapper>
      <VirtualList
        listRef={listRef}
        style={{ height: 380, width: 400, margin: "0 auto" }}
        data={books}
        endReached={loadMore}
        totalCount={data?.total}
        initialItemCount={0}
        isLoading={isLoading}
        itemContent={(_i: number, book: any) => (
          // we cannot use margins because it is a virtual list
          // therefor we wrap our component with a div and give it some padding
          <div style={{ padding: 5 }}>
            <Book book={book} />
          </div>
        )}
      />
    </Page>
  );
};

export default HomePage;
