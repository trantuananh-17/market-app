import { formatDate } from "app/helper/date";
import { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AvatarView from "./AvatarView";
import colors from "@utils/colors";
import { formatPrice } from "app/helper/price";
import ImageSlider from "./ImageSlider";
import { Product } from "app/store/listing";

interface Props {
  product: Product;
}

const ProductDetail: FC<Props> = ({ product }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageSlider images={product.image} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      <Text style={styles.date}>
        Purchased on: {formatDate(product.date, "dd-LLL-yyyy")}
      </Text>
      <Text style={styles.descriptionTitle}>Description:</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.profileContainer}>
        <AvatarView uri={product.seller.avatar} size={60} />
        <Text style={styles.profileName}>{product.seller.name}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  category: {
    color: colors.textSecondary,
    fontWeight: "regular",
    fontSize: 18,
  },
  price: {
    marginTop: 15,
    color: colors.textPrimary,
    fontWeight: 700,
    fontSize: 20,
  },
  date: {
    marginTop: 5,
    color: colors.textPrimary,
    fontWeight: 500,
    fontSize: 16,
  },
  name: {
    marginTop: 15,
    color: colors.black,
    fontWeight: 700,
    fontSize: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 500,
  },
  description: {
    marginTop: 5,
    color: colors.textSecondary,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileName: {
    marginLeft: 10,
    color: colors.black,
    fontWeight: 700,
    fontSize: 20,
  },
});

export default ProductDetail;
