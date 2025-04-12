import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  title: string;
  color: string;
  onPress?(): void;
}

const ProductButton: FC<Props> = ({ title, onPress, color }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        <Feather name={title as any} size={24} color={color} />
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  text: {
    color: colors.textPrimary,
    fontWeight: 600,
  },
});

export default ProductButton;
