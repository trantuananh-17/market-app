import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

interface ShowToastOptions {
  title?: string;
  message?: string;
  duration?: number;
  autoHide?: boolean;
}

const baseShowToast = (
  type: ToastType,
  {
    title = "",
    message = "",
    duration = 2000,
    autoHide = true,
  }: ShowToastOptions
): void => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    visibilityTime: duration,
    autoHide,
  });
};

export const showSuccessToast = (options: ShowToastOptions) => {
  baseShowToast("success", options);
};

export const showErrorToast = (options: ShowToastOptions) => {
  baseShowToast("error", options);
};

export const showInfoToast = (options: ShowToastOptions) => {
  baseShowToast("info", options);
};
