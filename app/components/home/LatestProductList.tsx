import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductGridView from "./ProductGridView";
import AppTitle from "@ui/home/AppTitle";

interface Props {
  data: LatestProduct[];
  onPress(product: LatestProduct): void;
}

export type LatestProduct = {
  id: string;
  name: string;
  thumbnail?: string;
  category: string;
  price: number;
};

const LatestProductList: FC<Props> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <AppTitle title="Sản phẩm mới nhất" />
      <ProductGridView onPress={onPress} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LatestProductList;
