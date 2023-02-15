import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API, Token } from "lib/utils";
import { ROUTE_PATHS } from "lib/constants";

/**
 * @description custom hook used for the register request
 * @returns selected data from the useMutation hook
 */
export const useRegister = () => {
  const navigate = useNavigate();

  const {
    data,
    isSuccess,
    mutateAsync: registerAsync,
  } = useMutation(async (body: { email: string; password: string }) => {
    const apiClient = new API().getInstance();
    const response = await apiClient.post("/auth/register", body);
    return response.data;
  });

  useEffect(() => {
    if (!isSuccess || !data) return;

    Token.setToken(data.token.toString());
    navigate(ROUTE_PATHS.HOME);

    toast("Successfully registered!", {
      type: "success",
    });
  }, [isSuccess, data, navigate]);

  return { data, isSuccess, registerAsync };
};