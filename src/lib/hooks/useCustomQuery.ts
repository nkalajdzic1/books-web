import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

import { ApiErrorHandler } from "lib/classes";

export const useCustomQuery = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  options?: UseQueryOptions
): UseQueryResult<any> => {
  return useQuery(queryKey, queryFn, {
    onError: ApiErrorHandler.handleApiError,
    ...options,
  } as UseQueryOptions);
};
