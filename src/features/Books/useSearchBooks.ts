import { useQuery } from "react-query";

import { QUERY_KEYS } from "lib/constants";
import { getQueryParams, API } from "lib/utils";

/**
 * @description hook that retrieves the list of books from the api for the given search
 * @param {Object} params object containing the query http params (for instance: { pageNumber: 1, pageSize: 10 })
 * @param {Object} config custom configuration object for the react query useQuery hook
 * @returns result of the useQuery hook after calling the api
 */
export const useSearchBooks = (params: Object, config?: Object) => {
  return useQuery(
    [QUERY_KEYS.SEARCH_BOOKS, params],
    async () => {
      const apiClient = new API(
        process.env.REACT_APP_LIBRARY_API_URL
      ).getInstance();
      const response = await apiClient.get(
        `/search.json?${getQueryParams(params)}`
      );
      return {
        list: response.data || [],
        total: response.data.numFound || 0,
      };
    },
    {
      enabled: true,
      ...config,
    }
  );
};
