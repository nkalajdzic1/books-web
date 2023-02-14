import { useState } from "react";

import { SortOrder } from "lib/enums";

export interface IQueryFilter {
  pageSize?: number;
  pageNumber?: number;
  order?: SortOrder;
  orderBy?: string;
}

/**
 * @description custom hook to handle paging, sorting and etc in a declarative way
 * @param {Object} initialFilter initial values for the filters
 * @param {function} resetData reset function called on sort change, etc.
 * @returns state that is preserving the filters
 */
export const useQueryParams = (
  initialFilter: IQueryFilter,
  resetData: () => void
): Array<Object> => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(
    initialFilter.pageSize || 10
  );

  const [order, setOrder] = useState<SortOrder>(
    initialFilter.order || SortOrder.ASC
  );
  const [orderBy, setOrderBy] = useState<string>(initialFilter.orderBy || "");

  const onOrderChange = (
    newOrderBy: SortOrder,
    newOrder = SortOrder.ASC
  ): void => {
    if (resetData) resetData();

    setPageNumber(1);
    setOrderBy(newOrderBy);
    setOrder(newOrder);
  };

  return [
    {
      pageNumber,
      setPageNumber,
      pageSize,
      setPageSize,
    },
    { order, orderBy, onOrderChange },
  ];
};
