import colors from "@utils/colors";
import LottieView from "lottie-react-native";
import { FC } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

interface Props {
  visiable: boolean;
}

const Loading: FC<Props> = ({ visiable }) => {
  if (!visiable) return null;

  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/images/loading.json")}
          autoPlay
          loop
          style={{ flex: 1, transform: [{ scale: 0.8 }] }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backDrop,
  },
});

export default Loading;
