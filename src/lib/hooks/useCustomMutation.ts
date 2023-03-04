import {
  MutationKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";

import { ApiErrorHandler } from "lib/classes";

export const useCustomMutation = (
  mutationKey: MutationKey,
  mutationFn: (...params: any[]) => any,
  options?: UseMutationOptions<any>
): UseMutationResult<any> => {
  return useMutation(mutationFn, {
    mutationKey,
    onError: ApiErrorHandler.handleApiError,
    ...options,
  } as any);
};
