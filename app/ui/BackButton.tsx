import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@utils/colors";

interface Props {}

const BackButton: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={18} color={colors.primary} />
      <Text style={styles.title}>Go Back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default BackButton;
