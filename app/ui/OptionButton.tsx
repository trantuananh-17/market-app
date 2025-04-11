import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@utils/colors";

interface Props {
  visible?: boolean;
  onPress?(): void;
}

const OptionButton: FC<Props> = ({ onPress, visible }) => {
  if (!visible) return null;
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="ellipsis-vertical-sharp" color={colors.black} size={20} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OptionButton;
