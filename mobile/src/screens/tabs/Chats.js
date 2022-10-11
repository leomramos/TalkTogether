import React, { useState } from "react";
import { Text, View } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";
import { CustomInput, OverlayMenu, PageHeader } from "../../components";
import ScreenContainer from "../../components/ScreenContainer";

import i18n from "../../i18n";

const SortOverlay = () => {
  return (
    <>
      <IconButton icon="at" color="black" size={25} onPress={() => {}} />
      {/* <Menu.Item onPress={() => {}} title="Ale" />
      <Menu.Item onPress={() => {}} title="Te" />
      <Divider />
      <Menu.Item onPress={() => {}} title="Amo" /> */}
    </>
  );
};

export default Chats = () => {
  const [search, setSearch] = useState("");

  return (
    <ScreenContainer>
      <PageHeader title="Chats" titleExtra={<Text>b</Text>} sideOptions={[]} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomInput
          dense
          value={search}
          setValue={setSearch}
          search={() => {}}
          style={{ flexGrow: 1 }}
        />
        <CustomInput
          value={search}
          setValue={setSearch}
          label="Teste"
          icon="at"
          action={() => alert("oi, te amo")}
        />
        <OverlayMenu
          title="Sort"
          icon="dots-vertical"
          content={<SortOverlay />}
          footer={i18n.t("clear")}
        />
      </View>
    </ScreenContainer>
  );
};
