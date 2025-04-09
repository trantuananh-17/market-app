import OptionModal from "@components/OptionModal";
import AppButton from "@ui/AppButton";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import CategoryOption from "@ui/product/CategoryOption";
import CategorySelector from "@ui/product/CategorySelector";
import CreateHeader from "@ui/product/CreateHeader";
import DatePicker from "@ui/product/DatePicker";
import FormInput from "@ui/product/FormInput";
import categories from "@utils/categories";
import colors from "@utils/colors";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { showErrorToast, showSuccessToast } from "app/helper/toastHelper";
import FileSelector from "@ui/product/FileSelector";
import ImageList from "@components/ImageList";
import { productSchema, yupValidate } from "@utils/validator";
import mime from "mime";
import useClient from "app/hooks/useClient";
import { apiRequest } from "app/api/apiRequest";

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
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { authClient } = useClient();

  const { name, category, description, price, purchasingDate } = productInfo;

  const handlePress = () => {
    setShowCategoryModal(true);
  };

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
    try {
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ["images"],
        quality: 0.3,
        allowsMultipleSelection: true,
      });

      if (!assets) return;

      const imageUris = assets.map(({ uri }) => uri);
      setImages([...images, ...imageUris]);
    } catch (error) {
      showErrorToast({ title: "Lỗi", message: (error as any).message });
    }
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

          <CategorySelector
            icon="caretdown"
            name={category}
            onPress={handlePress}
          />

          <OptionModal
            visible={showCategoryModal}
            onRequestClose={setShowCategoryModal}
            options={categories}
            renderItem={(item) => {
              return <CategoryOption name={item.name} icon={item.icon} />;
            }}
            onPress={(item) => {
              setProductInfo({ ...productInfo, category: item.name });
            }}
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
            active={!loading}
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
