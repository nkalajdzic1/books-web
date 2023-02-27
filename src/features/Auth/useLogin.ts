import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API } from "lib/utils";
import { ROUTE_PATHS } from "lib/constants";
import { useAuthContext } from "lib/contexts";
import { ApiErrorHandler } from "lib/classes";

/**
 * @description custom hook used for the login request
 * @returns selected data from the useMutation hook
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  const {
    data,
    isSuccess,
    isLoading,
    mutate: login,
  } = useMutation(
    async (body: { email: string; password: string }) => {
      const apiClient = new API().getInstance();
      const response = await apiClient.post("/auth/login", body);
      return response.data;
    },
    {
      onError: ApiErrorHandler.handleApiError,
      onSuccess: (res) => {
        setToken(res.token.toString());
        navigate(ROUTE_PATHS.HOME);

        toast("Successfully logged in!", {
          type: "success",
        });
      },
    }
  );

  return { data, isSuccess, isLoading, login };
};
