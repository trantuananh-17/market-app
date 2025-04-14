import AppHeader from "@components/AppHeader";
import ImageList from "@components/ImageList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@ui/BackButton";
import colors from "@utils/colors";
import { ProfileNavigatorParam } from "app/navigation/app/ProfileNavigator";
import { FC, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import FormInput from "@ui/product/FormInput";
import DatePicker from "@ui/product/DatePicker";
import OptionModal from "@components/OptionModal";
import useClient from "app/hooks/useClient";
import { apiRequest } from "app/api/apiRequest";
import { selectImages } from "app/helper/selectImages";
import CategoryOptions from "@components/CategoryOptions";
import AppButton from "@ui/AppButton";
import { productSchema, yupValidate } from "@utils/validator";
import { showErrorToast, showSuccessToast } from "app/helper/toastHelper";
import mime from "mime";
import Loading from "@ui/Loading";

type Props = NativeStackScreenProps<ProfileNavigatorParam, "EditProduct">;

type ProductInfo = {
  name: string;
  description: string;
  category: string;
  price: string;
  purchasingDate: Date;
};

const imageOptions = [
  { value: "Use as Thumbnail", id: "thumb" },
  { value: "Remove Image", id: "remove" },
];

const EditProduct: FC<Props> = ({ route }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    ...route.params.product,
    price: route.params.product.price.toString(),
    date: new Date(route.params.product.date),
  });
  const { authClient } = useClient();

  const onPress = (image: string) => {
    setSelectedImage(image);
  };

  const onLongPress = (image: string) => {
    setSelectedImage(image);
    setShowImageOptions(true);
  };

  const removeSelectedImage = async () => {
    handleRemoveImageFromUI(selectedImage);
  };

  const handleRemoveImageFromUI = async (imageSelect: string) => {
    const notLocalImage = selectedImage.startsWith(
      "https://res.cloudinary.com"
    );

    if (notLocalImage) {
      setLoading(true);
      const splittedItems = selectedImage.split("/");
      const imageId = splittedItems[splittedItems.length - 1].split(".")[0];

      await apiRequest(
        authClient.delete(`/api/product/image/${product.id}/${imageId}`)
      );

      setLoading(false);
    }
    const images = product.image;
    const newImages = images?.filter((img) => img !== imageSelect);
    setProduct({ ...product, image: newImages });
  };

  const handleSelectImages = async () => {
    const newImages = await selectImages();
    const oldImages = product.image || [];
    const images = oldImages.concat(newImages);
    if (images.length > 5) {
      showErrorToast({ title: "Lỗi", message: "Không được chọn quá 5 ảnh" });
      setProduct({ ...product, image: [...oldImages] });
      return;
    }
    setProduct({ ...product, image: [...images] });
  };

  const setThumbnailProduct = () => {
    if (selectedImage.startsWith("https://res.cloudinary.com")) {
      setProduct({ ...product, thumbnail: selectedImage });
    }
  };

  const handleOnUpdate = async () => {
    setBusy(true);
    const dataToUpdate: ProductInfo = {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      purchasingDate: product.date,
    };

    const { error } = await yupValidate(productSchema, dataToUpdate);

    if (error) {
      setBusy(false);
      return showErrorToast({ title: "Lỗi", message: error });
    }

    const formData = new FormData();

    if (product.thumbnail) {
      formData.append("thumbnail", product.thumbnail);
    }
    type productInfoKeys = keyof typeof dataToUpdate;

    for (let key in dataToUpdate) {
      const value = dataToUpdate[key as productInfoKeys];

      if (value instanceof Date) formData.append(key, value.toISOString());
      else formData.append(key, value);

      product.image?.forEach((img, index) => {
        if (!img.startsWith("https://res.cloudinary.com")) {
          formData.append("images", {
            uri: img,
            name: "image_" + index,
            type: mime.getType(img) || "image/jpg",
          } as any);
        }
      });
    }
    console.log(formData);

    // send update product
    const res = await apiRequest<{ message: string }>(
      authClient.patch("/api/product/" + product.id, formData)
    );

    console.log(res?.message);

    if (res) {
      setBusy(false);
      showSuccessToast({
        title: "Thành công",
        message: "Cập nhật sản phẩm thành công",
      });
    }

    setBusy(false);
  };

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Images</Text>
          <ImageList
            images={product?.image || []}
            onPress={onPress}
            onLongPress={onLongPress}
            onDelete={handleRemoveImageFromUI}
          />

          <Pressable onPress={handleSelectImages} style={styles.imageSelector}>
            <FontAwesome5 name="images" size={30} color={colors.black} />
          </Pressable>

          <FormInput
            title="Name"
            placeholder="Product name"
            value={product?.name}
            onChangeText={(name) => setProduct({ ...product, name })}
          />

          <CategoryOptions
            onSelect={(category) => setProduct({ ...product, category })}
            title={product.category}
          />

          <FormInput
            title="Price"
            placeholder="Price"
            keyboardType="numeric"
            value={product?.price.toString()}
            onChangeText={(price) => setProduct({ ...product, price })}
          />
          <DatePicker
            value={product.date}
            title="Purchasing Date: "
            onChange={(date) => setProduct({ ...product, date })}
          />

          <FormInput
            title="Description"
            placeholder="Description..."
            value={product?.description}
            onChangeText={(description) =>
              setProduct({ ...product, description })
            }
          />
          <AppButton
            visiable={busy}
            title="Update Product"
            onPress={handleOnUpdate}
          />
        </ScrollView>
      </View>
      <Loading visiable={loading} />
      <OptionModal
        visible={showImageOptions}
        onRequestClose={setShowImageOptions}
        options={imageOptions}
        renderItem={(option) => {
          return <Text style={styles.option}>{option.value}</Text>;
        }}
        onPress={({ id }) => {
          if (id === "thumb") setThumbnailProduct();

          if (id === "remove") removeSelectedImage();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 10,
  },
  imageSelector: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.border,
    marginVertical: 10,
  },
  option: {
    paddingVertical: 10,
    color: colors.primary,
  },
});

export default EditProduct;
