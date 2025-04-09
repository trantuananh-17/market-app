import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  title: string;
  onPress?(): void;
}

const ProductButton: FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  text: {
    color: colors.textPrimary,
    fontWeight: 600,
  },
});

export default ProductButton;
