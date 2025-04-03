import OptionModal from "@components/OptionModal";
import AppButton from "@ui/AppButton";
import CustomKeyboardAvoidingView from "@ui/CustomKeyboardAvoidingView";
import CategoryOption from "@ui/product/CategoryOption";
import CategorySelector from "@ui/product/CategorySelector";
import CreateHeader from "@ui/product/CreateHeader";
import DatePicker from "@ui/product/DatePicker";
import FileSelector from "@ui/product/FileSelector";
import FormInput from "@ui/product/FormInput";
import categories from "@utils/categories";
import colors from "@utils/colors";
import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

interface Props {}

const Create: FC<Props> = (props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handlePress = () => {
    setShowCategoryModal(true);
  };

  return (
    <View style={styles.container}>
      <CustomKeyboardAvoidingView>
        <View style={styles.card}>
          <CreateHeader />

          <FormInput title="Name" placeholder="Name product..." />

          <CategorySelector icon="caretdown" onPress={handlePress} />

          <OptionModal
            visible={showCategoryModal}
            onRequestClose={setShowCategoryModal}
            options={categories}
            renderItem={(item) => {
              return <CategoryOption name={item.name} icon={item.icon} />;
            }}
            onPress={(item) => {
              console.log(item);
            }}
          />

          <FormInput title="Price" placeholder="Prices... " />

          <FormInput
            title="Description"
            placeholder="Description... "
            multiline={true}
          />

          <DatePicker
            title="Purchasing Date: "
            value={new Date()}
            onChange={() => {}}
          />

          <FileSelector />

          <AppButton title="Create New Product" />
        </View>
      </CustomKeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingVertical: 40,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Create;
