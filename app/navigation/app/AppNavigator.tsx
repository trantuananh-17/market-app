import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@views/Home";
import ProductInfo from "@views/ProductInfo";
import ProductList from "@views/ProductList";
import { Product } from "app/store/listing";
import { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {}

export type AppStackParamList = {
  Home: undefined;
  ProductList: undefined;
  ProductInfo: { product?: Product; id?: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
