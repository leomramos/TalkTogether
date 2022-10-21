import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

export default MyProfile = () => {
  return (
    <ScreenContainer>
      <PageHeader title={i18n.t("myProfile")} />
    </ScreenContainer>
  );
};
