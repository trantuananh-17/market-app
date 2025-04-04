import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  icon: string;
  name: string;
  onPress(): void;
}

const CategorySelector: FC<Props> = ({ icon, name, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.categoryTitle}>
        {name !== "" ? name : "Category"}
      </Text>
      <AntDesign name={icon as any} size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.deActive,
    borderRadius: 5,
  },
  categoryTitle: {
    color: colors.textPrimary,
  },
});

export default CategorySelector;
