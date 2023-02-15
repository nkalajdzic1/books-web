import { useCallback, useState } from "react";

import { SortOrder } from "lib/enums";

export interface IQueryFilter {
  pageSize?: number;
  pageNumber?: number;
  order?: SortOrder;
  orderBy?: string;
  search?: string;
}

/**
 * @description custom hook to handle paging, sorting and etc in a declarative way
 * @param {Object} initialFilter initial values for the filters
 * @param {function} resetData reset function called on sort change, etc.
 * @returns state that is preserving the filters
 */
export const useQueryParams = (
  initialFilter?: IQueryFilter,
  resetData?: () => void
): Array<any> => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(
    initialFilter?.pageSize || 10
  );

  const [order, setOrder] = useState<SortOrder>(
    initialFilter?.order || SortOrder.ASC
  );
  const [orderBy, setOrderBy] = useState<string>(initialFilter?.orderBy || "");

  const [search, setSearch] = useState<string>(initialFilter?.search || "");

  const onOrderChange = useCallback(
    (newOrderBy: SortOrder, newOrder = SortOrder.ASC): void => {
      if (resetData) resetData();

      setPageNumber(1);
      setOrderBy(newOrderBy);
      setOrder(newOrder);
    },
    [resetData]
  );

  const onSearch = useCallback(
    (val: string) => {
      if (resetData) resetData();

      setSearch(val);
      setPageNumber(1);
    },
    [resetData]
  );

  return [
    {
      pageNumber,
      setPageNumber,
      pageSize,
      setPageSize,
    },
    { order, orderBy, onOrderChange },
    { search, onSearch },
  ];
};
