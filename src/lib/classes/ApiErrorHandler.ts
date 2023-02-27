import { toast } from "react-toastify";

import { IApiError } from "lib/interfaces";

export class ApiErrorHandler {
  public static handleApiError(err: IApiError) {
    toast(
      (err.response?.data as Array<any>)?.[0]?.message || "An error occured",
      {
        type: "error",
      }
    );
  }
}
