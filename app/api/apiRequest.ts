import { showErrorToast } from "app/helper/toastHelper";
import { AxiosError, AxiosResponse } from "axios";

type SuccessResponse<T> = {
  data: T;
  error: null;
};

type ErrorResponse<E> = {
  data: null;
  error: E;
};

export const apiRequest = async <T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T | null> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    let message = (error as any).message;
    if (error instanceof AxiosError) {
      const response = error.response;
      if (response) {
        message = response.data.message;
      }
    }
    showErrorToast({ title: "Lỗi", message: message });
  }
  return null;
};
