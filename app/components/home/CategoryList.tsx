import categories from "@utils/categories";
import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

interface Props {
  onPress(category: string): void;
}

const CategoryList: FC<Props> = ({ onPress }) => {
  return (
    <FlatList
      style={styles.container}
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const color = colors.COLORS[index % colors.COLORS.length];
        return (
          <Pressable style={styles.item} onPress={() => onPress(item.name)}>
            <View style={[styles.colorBar, { backgroundColor: color }]} />
            <View style={styles.content}>
              <View>{item.icon}</View>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, padding: 10 },

  item: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2, // shadow Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  colorBar: {
    width: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CategoryList;
