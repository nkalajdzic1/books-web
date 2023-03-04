import { FunctionComponent, PropsWithChildren } from "react";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";

import { Spinner } from "./Spinner";

const ListSpinner = styled(Spinner)`
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface IVirtualList extends PropsWithChildren {
  style: Object;
  isLoading?: boolean;
  listRef?: any;
  data: Array<any>;
  endReached: (index: number) => void;
  totalCount: number;
  initialItemCount: number;
  itemContent: any;
}

export const VirtualList: FunctionComponent<IVirtualList> = ({
  style,
  isLoading,
  listRef,
  data,
  endReached,
  totalCount,
  initialItemCount,
  itemContent,
}) => {
  return (
    <Virtuoso
      style={{ ...style, overflowX: "hidden" }}
      ref={listRef}
      components={{
        Footer: () => (isLoading ? <ListSpinner /> : null),
      }}
      data={data}
      endReached={endReached}
      totalCount={totalCount}
      initialItemCount={initialItemCount}
      itemContent={itemContent}
    />
  );
};
