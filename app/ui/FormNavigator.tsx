import colors from "@utils/colors";
import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  topTitle?: string;
  bottomTitle?: string;
  footerTitle?: string;
  onTopPress?(): void;
  onBottomPress?(): void;
}

const FormNavigator: FC<Props> = ({
  topTitle,
  bottomTitle,
  onTopPress,
  onBottomPress,
  footerTitle,
}) => {
  return topTitle !== "" ? (
    <View style={styles.container}>
      <Pressable onPress={onTopPress}>
        <Text style={styles.title}>{topTitle}</Text>
      </Pressable>
      <View style={styles.formNavigatorContainer}>
        <Text style={styles.footerText}>{footerTitle}</Text>
        <Pressable onPress={onBottomPress}>
          <Text style={styles.title}>{bottomTitle}</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.formNavigatorContainer}>
        <Text style={styles.footerText}>{footerTitle}</Text>
        <Pressable onPress={onBottomPress}>
          <Text style={styles.title}>{bottomTitle}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "semibold",
    textDecorationLine: "underline",
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  formNavigatorContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default FormNavigator;
