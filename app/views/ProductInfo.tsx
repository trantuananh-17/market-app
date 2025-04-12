import AppHeader from "@components/AppHeader";
import OptionModal from "@components/OptionModal";
import ProductDetail from "@components/ProductDetail";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@ui/BackButton";
import OptionButton from "@ui/OptionButton";
import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParam } from "app/navigation/app/ProfileNavigator";
import { FC, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export type Product = {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  price: number;
  image?: string[];
  date: string;
  description: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};

type Props = NativeStackScreenProps<ProfileNavigatorParam, "ProductInfo">;

const ProductInfo: FC<Props> = ({ route }) => {
  const { product } = route.params;

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        {product ? <ProductDetail product={product} /> : <></>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductInfo;
