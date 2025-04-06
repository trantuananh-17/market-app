import AvatarView from "@components/AvatarView";
import colors from "@utils/colors";
import useAuth from "app/hooks/useAuth";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  height?: number;
  marginBot?: number;
  size?: number;
  name?: string;
  tab?: string;
}

const HeaderProfile: FC<Props> = ({
  size = 50,
  height = 150,
  marginBot = 100,
  name,
  tab,
}) => {
  const { authState } = useAuth();
  const { profile } = authState;

  return (
    <View
      style={[{ height: height, marginBottom: marginBot }, styles.container]}
    >
      <View
        style={
          !tab
            ? [
                { left: "50%", top: "50%" },
                styles.background,
                styles.mainProfile,
              ]
            : [
                { left: "20%", top: "40%" },
                styles.background,
                styles.changeProfile,
              ]
        }
      >
        <AvatarView uri={profile?.avatar} size={size} />
        <Text style={!tab ? styles.textNameMain : styles.textNameChange}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: colors.primary,
    width: "100%",
  },
  background: {
    position: "absolute",
    transform: [{ translateX: -75 }],
  },
  mainProfile: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  changeProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textNameMain: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "bold",
  },
  textNameChange: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HeaderProfile;
