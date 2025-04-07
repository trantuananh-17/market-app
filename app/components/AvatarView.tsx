import { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "@utils/colors";

interface Props {
  uri?: string;
  size?: number;
}

const AvatarView: FC<Props> = ({ size = 50, uri }) => {
  return (
    <View
      style={[
        { width: size, height: size, borderRadius: size / 2 },
        styles.container,
        !uri && styles.profileIcon,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.flex1} />
      ) : (
        <View>
          <FontAwesome5 name="user" size={size / 2} color="black" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderWidth: 4,
    borderColor: colors.white,
  },
  flex1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileIcon: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AvatarView;
