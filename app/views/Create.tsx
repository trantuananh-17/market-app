import AppButton from "@ui/AppButton";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import CreateHeader from "@ui/product/CreateHeader";
import DatePicker from "@ui/product/DatePicker";
import FormInput from "@ui/product/FormInput";
import colors from "@utils/colors";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { showErrorToast, showSuccessToast } from "app/helper/toastHelper";
import FileSelector from "@ui/product/FileSelector";
import ImageList from "@components/ImageList";
import { productSchema, yupValidate } from "@utils/validator";
import mime from "mime";
import useClient from "app/hooks/useClient";
import { apiRequest } from "app/api/apiRequest";
import CategoryOptions from "@components/CategoryOptions";
import { selectImages } from "app/helper/selectImages";

interface Props {}

const defaultInfo = {
  name: "",
  description: "",
  category: "",
  price: "",
  purchasingDate: new Date(),
};

const Create: FC<Props> = (props) => {
  const [productInfo, setProductInfo] = useState({ ...defaultInfo });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { authClient } = useClient();

  const { name, category, description, price, purchasingDate } = productInfo;

  const handleChange = (name: string) => {
    return (text: string) => {
      setProductInfo({ ...productInfo, [name]: text });
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await yupValidate(productSchema, productInfo);

    if (error) {
      setLoading(false);
      return showErrorToast({ title: "Lỗi", message: error });
    }

    const formData = new FormData();

    type productInfoKeys = keyof typeof productInfo;

    for (let key in productInfo) {
      const value = productInfo[key as productInfoKeys];

      if (value instanceof Date) formData.append(key, value.toISOString());
      else formData.append(key, value);
    }

    //append images
    const listImages = images.map((img, index) => ({
      name: "images_" + index,
      type: mime.getType(img) || "image/jpeg",
      uri: img,
    }));

    for (let img of listImages) {
      formData.append("images", img as any);
    }

    const res = await apiRequest<{ message: string }>(
      authClient.post("/api/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );

    if (res?.message) {
      showSuccessToast({
        title: "Thành công",
        message: "Thêm sản phẩm thành công",
      });
      setProductInfo({ ...defaultInfo });
      setImages([]);
    }

    setLoading(false);
  };

  const handleSelectImage = async () => {
    const newImages = await selectImages();
    const count = images.length + newImages.length;
    if (count > 5) {
      showErrorToast({ title: "Lỗi", message: "Không được chọn quá 5 ảnh" });
      setImages([...images]);
      return;
    }
    setImages([...images, ...newImages]);
  };

  return (
    <View style={styles.container}>
      <CustomKeyboardAvoidingView>
        <View style={styles.card}>
          <CreateHeader />

          <FormInput
            title="Name"
            placeholder="Name product..."
            value={name}
            onChangeText={handleChange("name")}
          />

          <CategoryOptions
            title={category}
            onSelect={handleChange("category")}
          />

          <FormInput
            value={price}
            title="Price"
            placeholder="Prices... "
            keyboardType="numeric"
            onChangeText={handleChange("price")}
          />

          <FormInput
            value={description}
            title="Description"
            placeholder="Description... "
            multiline={true}
            onChangeText={handleChange("description")}
          />

          <DatePicker
            title="Purchasing Date: "
            value={purchasingDate}
            onChange={(purchasingDate) =>
              setProductInfo({ ...productInfo, purchasingDate })
            }
          />

          <View style={styles.listImage}>
            <FileSelector onPress={handleSelectImage} />
            <ImageList
              images={images}
              onDelete={(uri) => {
                setImages((img) => img.filter((i) => i !== uri));
              }}
            />
          </View>

          <AppButton
            visiable={loading}
            title="Create New Product"
            onPress={handleSubmit}
          />
        </View>
      </CustomKeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingVertical: 40,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listImage: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Create;
