import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API } from "lib/utils";
import { ROUTE_PATHS } from "lib/constants";
import { useAuthContext } from "lib/contexts";

/**
 * @description custom hook used for the register request
 * @returns selected data from the useMutation hook
 */
export const useRegister = () => {
  const { setToken } = useAuthContext();

  const navigate = useNavigate();

  const {
    data,
    isSuccess,
    isLoading,
    mutateAsync: registerAsync,
  } = useMutation(async (body: { email: string; password: string }) => {
    const apiClient = new API().getInstance();
    const response = await apiClient.post("/auth/register", body);
    return response.data;
  });

  useEffect(() => {
    if (!isSuccess || !data) return;

    setToken(data.token.toString());
    navigate(ROUTE_PATHS.HOME);

    toast("Successfully registered!", {
      type: "success",
    });
  }, [isSuccess, data, setToken, navigate]);

  return { data, isSuccess, isLoading, registerAsync };
};
