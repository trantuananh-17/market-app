import { FC } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "@utils/colors";

interface Props {
  onPress?(): void;
}

const FileSelector: FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="images" size={40} color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
  },
  text: {
    color: colors.textPrimary,
  },
});

export default FileSelector;
