import { View, Text, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "app/navigation/app/AppNavigator";
import colors from "@utils/colors";

const HomeRoute = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },

  searchContainer: {
    flex: 1,
  },
});

export default HomeRoute;
