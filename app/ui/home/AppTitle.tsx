import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  name?: string;
}

const AppTitle: FC<Props> = ({ title, name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: 600,
    color: colors.textPrimary,
    fontSize: 24,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
});

export default AppTitle;
