import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatWindow from "@views/ChatWindow";
import Home from "@views/Home";
import ProductInfo from "@views/ProductInfo";
import ProductListByCategory from "@views/ProductListByCategory";
import { Product } from "app/store/listing";
import { FC } from "react";
import { StyleSheet } from "react-native";

interface Props {}

export type AppStackParamList = {
  Home: undefined;
  ProductListByCategory: { category: string };
  ChatWindow: undefined;
  ProductInfo: { product?: Product; id?: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProductListByCategory"
        component={ProductListByCategory}
      />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
