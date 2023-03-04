import { useCallback, useState } from "react";

import { SortOrder } from "lib/enums";
import { useImmer } from "use-immer";

export interface IQueryFilter {
  pageSize?: number;
  pageNumber?: number;
  order?: SortOrder;
  orderBy?: string;
  search?: string;
}

export interface ISearchObject {
  keyword: string;
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

  const [search, setSearch] = useImmer<ISearchObject>({
    keyword: initialFilter?.search || "",
  });

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
    (params: any) => {
      if (resetData) resetData();

      setSearch((draft: any) => {
        for (let p in params) {
          draft[p] = params[p];
        }
      });

      setPageNumber(1);
    },
    [resetData, setSearch]
  );

  return [
    {
      pageNumber,
      setPageNumber,
      pageSize,
      setPageSize,
    },
    { order, orderBy, onOrderChange },
    { search: search, onSearch },
  ];
};
