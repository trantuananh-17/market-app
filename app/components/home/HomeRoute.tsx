import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "./SearchBar";
import colors from "@utils/colors";
import LatestProductList, { LatestProduct } from "./LatestProductList";
import { useEffect, useState } from "react";
import { apiRequest } from "app/api/apiRequest";
import useClient from "app/hooks/useClient";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "app/navigation/app/AppNavigator";

const testData = [
  // {
  //   id: "65943153939eb031a99e71e0",
  //   name: "E-book Reader",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "Electronics",
  //   price: 129.99,
  // },
  // {
  //   id: "65943153939eb031a99e71df",
  //   name: "Portable Speaker",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1524656855800-59465ebcec69?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "Electronics",
  //   price: 49.99,
  // },
  // {
  //   id: "65943153939eb031a99e71de",
  //   name: "Wireless Mouse",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "Electronics",
  //   price: 29.99,
  // },
  // {
  //   id: "65943153939eb031a99e71dd",
  //   name: "Digital Camera",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1556306535-38febf6782e7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "Electronics",
  //   price: 349.99,
  // },
  // {
  //   id: "65943153939eb031a99e71e2",
  //   name: "Laptop",
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "Electronics",
  //   price: 999.99,
  // },
];

const HomeRoute = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const { authClient } = useClient();

  const fetchLatestProduct = async () => {
    const res = await apiRequest<{ products: LatestProduct[] }>(
      authClient.get("/api/product/latest")
    );

    if (res?.products) {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    fetchLatestProduct();
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SearchBar />
        <ScrollView style={styles.card}>
          <LatestProductList
            data={products}
            onPress={({ id }) => navigate("ProductInfo", { id })}
          />
        </ScrollView>
      </View>
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

export default HomeRoute;
