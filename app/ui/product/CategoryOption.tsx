import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  icon: JSX.Element;
  name: string;
}

const CategoryOption: FC<Props> = ({ icon, name }) => {
  return (
    <View style={styles.container}>
      <View style={{ transform: [{ scale: 0.6 }] }}>{icon}</View>
      <Text style={styles.category}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  category: {
    color: colors.primary,
    paddingVertical: 10,
  },
});

export default CategoryOption;
