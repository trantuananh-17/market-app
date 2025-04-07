import ProfileOption from "@components/ProfileOption";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import HeaderProfile from "@ui/HeaderProfile";
import colors from "@utils/colors";

import useAuth from "app/hooks/useAuth";
import { ProfileNavigatorParam } from "app/navigation/app/ProfileNavigator";
import { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Props {}

const Profile: FC<Props> = (props) => {
  const { navigate } = useNavigation<NavigationProp<ProfileNavigatorParam>>();

  const { authState, signOut } = useAuth();
  const { profile } = authState;

  const onChangeInfoPress = () => {
    navigate("ChangeInfo");
  };

  const onMyListPress = () => {
    navigate("MyProductList");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderProfile size={150} name={profile?.name} />

      <FormDivider width={100} />
      <View style={styles.listOption}>
        <ProfileOption
          antIcon="edit"
          title="Chỉnh sửa thông tin"
          color={colors.COLORS[1]}
          onPress={onChangeInfoPress}
        />
        <ProfileOption
          antIcon="appstore-o"
          title="Sản phẩm của tôi"
          color={colors.COLORS[4]}
          onPress={onMyListPress}
        />
        <AppButton title="Đăng xuất" onPress={signOut} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  listOption: {
    paddingHorizontal: 40,
  },
});

export default Profile;
