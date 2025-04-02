import colors from "@utils/colors";
import { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";

interface Props<T> {
  visible: boolean;
  onRequestClose(state: boolean): void;
  options: T[];
  renderItem(item: T): JSX.Element;
  onPress(item: T): void;
}

const OptionModal = <T extends unknown>({
  visible,
  onRequestClose,
  options,
  renderItem,
  onPress,
}: Props<T>) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onRequestClose(!visible)}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView>
            {options.map((item, index) => {
              return (
                <Pressable key={index} onPress={() => onPress(item)}>
                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: colors.backDrop,
  },
  innerContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    maxHeight: 200,
    width: "100%",
  },
});

export default OptionModal;
