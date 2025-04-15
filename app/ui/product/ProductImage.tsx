import { FC } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

interface Props {
  uri?: string;
  width?: number;
  height?: number;
  isChecked?: boolean;
}

const { width } = Dimensions.get("screen");
const imageWidth = width - 30;
const aspect = 16 / 9;

const ProductImage: FC<Props> = ({
  uri,
  width = 80,
  height = 80,
  isChecked,
}) => {
  return (
    <Image
      source={{ uri }}
      style={
        !isChecked ? [styles.image, { width, height }] : styles.imageSlider
      }
      resizeMethod="resize"
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  imageSlider: {
    width: imageWidth,
    height: imageWidth / aspect,
    borderRadius: 7,
    borderWidth: 0.1,
  },
});

export default ProductImage;
