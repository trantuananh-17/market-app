import CategoryRoute from "@components/home/CategoryRoute";
import HomeRoute from "@components/home/HomeRoute";
import { FC, useState } from "react";
import { View, StyleSheet, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";

interface RouteType {
  key: string;
  title: string;
}

const Home: FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<RouteType[]>([
    { key: "home", title: "Home" },
    { key: "category", title: "Danh mục" },
  ]);

  const renderScene = SceneMap({
    home: HomeRoute,
    category: CategoryRoute,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height }}
        lazy
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "blue" }}
            style={{ backgroundColor: "white" }}
            activeColor="blue"
            inactiveColor="gray"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default Home;
