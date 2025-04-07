import { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import colors from "@utils/colors";

interface Props {
  antIcon: string;
  title: string;
  color?: string;
  onPress?(): void;
}

const ProfileOption: FC<Props> = ({ antIcon, title, onPress, color }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.innerContainer}>
        <AntDesign name={antIcon as any} size={24} color={color} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <EvilIcons name="chevron-right" size={30} color={colors.textSecondary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
    color: colors.textPrimary,
  },
});

export default ProfileOption;
