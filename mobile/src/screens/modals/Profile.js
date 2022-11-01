import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PageHeader, ScreenContainer } from "../../components/";
import { UserProfile } from "../mocks";

import i18n from "../../i18n";

export default Profile = ({ route, navigation }) => {
  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("profile")} goBack={navigation.goBack} />
      <UserProfile name={route.params && route.params.user.name} />
    </ScreenContainer>
  );
};
