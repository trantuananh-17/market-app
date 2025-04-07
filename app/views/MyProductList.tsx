import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {}

const MyProductList: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Đây là danh sách sản phẩm của tôi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MyProductList;
