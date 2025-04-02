import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "@utils/colors";

interface Props {}

const FileSelector: FC<Props> = (props) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="images" size={40} color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
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
