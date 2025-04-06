import FormDivider from "@ui/FormDivider";
import HeaderProfile from "@ui/HeaderProfile";

import useAuth from "app/hooks/useAuth";
import { FC } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Props {}

const Profile: FC<Props> = (props) => {
  const { authState } = useAuth();
  const { profile } = authState;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderProfile size={150} name={profile?.name} />

      <FormDivider width={300} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Profile;
