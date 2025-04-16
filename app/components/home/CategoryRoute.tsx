import colors from "@utils/colors";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "app/navigation/app/AppNavigator";
import CategoryList from "./CategoryList";

const CategoryRoute = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="menu-outline" size={24} color={colors.white} />
        <Text style={styles.titleText}>Danh sách danh mục</Text>
      </View>
      <CategoryList
        onPress={(category) => navigate("ProductListByCategory", { category })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 600,
    color: colors.white,
  },
});

export default CategoryRoute;
