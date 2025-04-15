import { LatestProduct } from "@components/home/LatestProductList";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props<T> {
  data: T[];
  col: number;
  renderItem(item: T): JSX.Element;
}

const GridView = <T extends unknown>(props: Props<T>) => {
  const { data, col, renderItem } = props;
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <View style={{ width: `${100 / col}%` }} key={index}>
            {renderItem(item)}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});

export default GridView;
