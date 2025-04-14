import colors from "@utils/colors";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

interface Props {
  title: string;
  visiable?: boolean;
  onPress?(): void;
}

const AppButton: FC<Props> = ({ title, visiable = false, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, !visiable ? styles.btnActive : styles.btnDeActive]}
    >
      {!visiable ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <ActivityIndicator color="#fff" />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  btnActive: {
    backgroundColor: colors.primary,
  },
  btnDeActive: {
    backgroundColor: colors.deActive,
  },
  title: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default AppButton;
