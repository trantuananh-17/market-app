import { FC } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@utils/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface Props {}

const SearchBar: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={20} color={colors.primary} />
      <TextInput
        placeholder="Search here...."
        style={styles.textInput}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
    color: colors.textPrimary,
    fontSize: 18,
  },
});

export default SearchBar;
