import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {}

const Message: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text> Đây là màn hình message</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Message;
