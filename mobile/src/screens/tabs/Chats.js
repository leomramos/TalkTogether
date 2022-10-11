import React, { useState } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { CustomInput, PageHeader } from "../../components";
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

export default Chats = () => {
  const [search, setSearch] = useState("");

  return (
    <ScreenContainer>
      <PageHeader title="Chats" titleExtra={<Text>b</Text>} />
      <CustomInput
        dense
        value={search}
        setValue={setSearch}
        search
        query={() => alert(search)}
      />
    </ScreenContainer>
  );
};
