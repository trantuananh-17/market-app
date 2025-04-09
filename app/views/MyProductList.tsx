import AppHeader from "@components/AppHeader";
import BackButton from "@ui/BackButton";
import FormDivider from "@ui/FormDivider";
import ProductButton from "@ui/product/ProductButton";
import ProductImage from "@ui/product/ProductImage";
import colors from "@utils/colors";
import { apiRequest } from "app/api/apiRequest";
import useClient from "app/hooks/useClient";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Props {}

type Product = {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  price: number;
  image?: string[];
  date: Date;
  description: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};

type ListingRes = {
  products: Product[];
};

const MyProductList: FC<Props> = (props) => {
  const [Listings, setListings] = useState<Product[]>([]);
  const { authClient } = useClient();

  const fetchList = async () => {
    const res = await apiRequest<ListingRes>(
      authClient.get("/api/product/listings")
    );

    console.log(res);

    if (res) setListings(res.products);
  };

  useEffect(() => {
    fetchList();
  }, []);

  console.log(Listings);

  return (
    <View>
      <AppHeader backButton={<BackButton />} />

      <FlatList
        style={styles.container}
        data={Listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.productItem}>
              <ProductImage uri={item.thumbnail} />
              <View style={styles.info}>
                <Text style={styles.textName}>{item.name}</Text>
                <Text>Giá: {item.price}</Text>
                <Text>Ngày đăng: </Text>
              </View>
              <View style={styles.button}>
                <ProductButton title="Chỉnh sửa" />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  productItem: {
    padding: 5,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
    gap: 10,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  textName: {
    fontSize: 16,
    fontWeight: 600,
    flex: 1,
  },
  button: {
    alignSelf: "center",
  },
});

export default MyProductList;
