import { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OptionModal from "./OptionModal";
import categories from "@utils/categories";
import CategoryOption from "@ui/product/CategoryOption";
import CategorySelector from "@ui/product/CategorySelector";

interface Props {
  title: string;
  onSelect(category: string): void;
}

const CategoryOptions: FC<Props> = ({ title, onSelect }) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <View style={styles.container}>
      <CategorySelector
        icon="caretdown"
        name={title}
        onPress={() => setShowCategoryModal(true)}
      />
      <OptionModal
        visible={showCategoryModal}
        onRequestClose={setShowCategoryModal}
        options={categories}
        renderItem={(item) => {
          return <CategoryOption {...item} />;
        }}
        onPress={(item) => {
          onSelect(item.name);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoryOptions;
