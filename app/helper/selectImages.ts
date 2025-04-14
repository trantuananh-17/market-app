import * as ImagePicker from "expo-image-picker";
import { showErrorToast } from "./toastHelper";

export const selectImages = async () => {
  let result: string[] = [];

  try {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ["images"],
      quality: 0.3,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if (canceled) return [];

    if (assets) {
      result = assets.map(({ uri }) => uri);
    }
  } catch (error) {
    showErrorToast({
      title: "Lỗi",
      message: (error as any)?.message || "Đã có lỗi xảy ra khi chọn ảnh",
    });
  }

  return result;
};
