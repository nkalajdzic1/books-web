import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API } from "lib/utils";
import { MUTATION_KEYS, ROUTE_PATHS } from "lib/constants";
import { useAuthContext } from "lib/contexts";
import { useCustomMutation } from "lib/hooks";

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
    mutate: register,
  } = useCustomMutation(
    MUTATION_KEYS.REGISTER,
    async (body: { email: string; password: string }) => {
      const apiClient = new API().getInstance();
      const response = await apiClient.post("/auth/register", body);
      return response.data;
    },
    {
      onSuccess: (res) => {
        setToken(res?.token?.toString());
        navigate(ROUTE_PATHS.HOME);

        toast("Successfully registered!", {
          type: "success",
        });
      },
    }
  );

  return { data, isSuccess, isLoading, register };
};
