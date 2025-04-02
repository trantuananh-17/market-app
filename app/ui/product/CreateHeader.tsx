import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {}

const CreateHeader: FC<Props> = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Start Selling Today</Text>
      <Text style={styles.subtitle}>
        Create items you want to sell with the community
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

export default CreateHeader;
