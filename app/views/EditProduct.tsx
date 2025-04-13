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

type Props = NativeStackScreenProps<ProfileNavigatorParam, "EditProduct">;
const imageOptions = [
  { value: "Use as Thumbnail", id: "thumb" },
  { value: "Remove Image", id: "remove" },
];

const EditProduct: FC<Props> = ({ route }) => {
  const { product } = route.params;

  const [selectedImage, setSelectedImage] = useState("");
  const [showImageOptions, setShowImageOptions] = useState(false);
  const onLongPress = (image: string) => {
    setSelectedImage(image);
    setShowImageOptions(true);
  };
  const removeSelectedImage = () => {
    console.log(selectedImage);
  };
  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Images</Text>
          <ImageList images={product?.image || []} onLongPress={onLongPress} />
          <Pressable style={styles.imageSelector}>
            <FontAwesome5 name="images" size={30} color={colors.black} />
          </Pressable>

          <FormInput
            title="Name"
            placeholder="Product name"
            value={product?.name}
          />

          <FormInput
            title="Name"
            placeholder="Price"
            keyboardType="numeric"
            value={product?.price.toString()}
          />
          <DatePicker
            value={new Date(product.date)}
            title="Purchasing Date: "
            onChange={() => {}}
          />
        </ScrollView>
      </View>
      <OptionModal
        visible={showImageOptions}
        onRequestClose={setShowImageOptions}
        options={imageOptions}
        renderItem={(option) => {
          return <Text style={styles.option}>{option.value}</Text>;
        }}
        onPress={({ id }) => {
          if (id === "thumb") {
          }
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
