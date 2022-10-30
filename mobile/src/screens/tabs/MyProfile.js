import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ScreenContainer, UserProfile } from "../../components/";

import i18n from "../../i18n";

export default MyProfile = () => {
  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("myProfile")} />
      <UserProfile />
    </ScreenContainer>
  );
};
