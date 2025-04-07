import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {}

const ChangeInfo: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Đây là màn hình chỉnh sửa thông tin user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChangeInfo;
