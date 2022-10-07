import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PageHeader, CustomInput } from "../../components";
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

export default Chats = () => {
  return (
    <ScreenContainer>
      <PageHeader title="Chats" />
      <CustomInput />
    </ScreenContainer>
  );
};
