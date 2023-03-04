import { QUERY_KEYS } from "lib/constants";
import { getQueryParams, LibraryAPI } from "lib/utils";
import { useCustomQuery } from "lib/hooks";

/**
 * @description hook that retrieves the list of books from the api for the given search
 * @param {Object} params object containing the query http params (for instance: { pageNumber: 1, pageSize: 10 })
 * @param {Object} config custom configuration object for the react query useQuery hook
 * @returns result of the useQuery hook after calling the api
 */
export const useSearchBooks = (params: Object, config?: Object) => {
  return useCustomQuery(
    [QUERY_KEYS.SEARCH_BOOKS, params],
    async () => {
      const apiClient = new LibraryAPI(
        process.env.REACT_APP_LIBRARY_API_URL
      ).getInstance();

      const response = await apiClient.get(
        `/search.json?${getQueryParams(params)}`
      );

      return {
        list: response.data.docs || [],
        total: response.data.numFound || 0,
      };
    },
    {
      enabled: true,
      select: (res: any) => {
        return {
          ...res,
          list: res?.list.map((x: any) => ({
            title: x.title,
            authors: x.author_name || [],
            lccns: x.lccn || [],
          })),
        };
      },
      ...config,
    }
  );
};
