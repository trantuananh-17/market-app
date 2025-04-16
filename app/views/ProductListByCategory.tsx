import AppHeader from "@components/AppHeader";
import { LatestProduct } from "@components/home/LatestProductList";
import ProductGridView from "@components/home/ProductGridView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from "@ui/BackButton";
import AppTitle from "@ui/home/AppTitle";
import EmptyView from "@ui/home/EmptyView";
import Loading from "@ui/Loading";
import colors from "@utils/colors";
import { apiRequest } from "app/api/apiRequest";
import useClient from "app/hooks/useClient";
import { AppStackParamList } from "app/navigation/app/AppNavigator";
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

type Props = NativeStackScreenProps<AppStackParamList, "ProductListByCategory">;

const ProductListByCategory: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const { authClient } = useClient();
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const { category } = route.params;
  const [loading, setLoading] = useState(false);

  const fetchProductsByCategory = async (category: string) => {
    setLoading(true);
    const res = await apiRequest<{ products: LatestProduct[] }>(
      authClient.get("/api/product/by-category/" + category)
    );

    if (res) {
      setLoading(false);
      setProducts(res.products);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category]);

  if (loading) {
    return <Loading visiable={loading} />;
  }

  return (
    <View style={styles.container}>
      <AppHeader backButton={<BackButton />} />
      {products.length ? (
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <AppTitle title={category} />
              <ProductGridView
                data={products}
                onPress={({ id }) => navigate("ProductInfo", { id })}
              />
            </ScrollView>
          </View>
        </View>
      ) : (
        <EmptyView title="Không có sản phẩm trong mục này!" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: colors.background,
    padding: 10,
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 7,
    padding: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default ProductListByCategory;
