import React, { useState } from "react";
import { Text, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { PageHeader, ScreenContainer, UserProfile } from "../../components/";

import i18n from "../../i18n";

export default MyProfile = ({}) => {
  const { colors } = useTheme();

  const [editing, setEditing] = useState(false);

  const [curName, setCurName] = useState("User");
  const [name, setName] = useState(curName);

  const [curAbout, setCurAbout] = useState(
    "Elit eiusmod in incididunt laboris consectetur ullamco et quis quis. Consectetur aliqua veniam anim nisi sunt ipsum sint do sunt. Eiusmod cupidatat reprehenderit minim do minim consectetur labore eiusmod magna consectetur velit aute laboris ullamco."
  );
  const [about, setAbout] = useState(curAbout);

  const [curLangs, setCurLangs] = useState([]);
  const [langs, setLangs] = useState(curLangs);

  const handleSave = _ => {
    setCurName(name);
    setCurAbout(about);
    setCurLangs(langs);
    setEditing(false);
  };

  const handleCancel = _ => {
    setName(curName);
    setAbout(curAbout);
    setLangs(curLangs);
    setEditing(false);
  };

  const EditButton = _ => (
    <IconButton
      icon="square-edit-outline"
      color={colors.purple.sixth}
      onPress={() => setEditing(true)}
      style={{ margin: 0 }}
    />
  );

  const SaveButton = _ => (
    <IconButton
      icon="check"
      color={colors.aux.confirm}
      onPress={handleSave}
      style={{ marginVertical: 0 }}
    />
  );

  const CancelButton = _ => (
    <IconButton
      icon="close"
      color={colors.aux.cancel}
      onPress={handleCancel}
      style={{ margin: 0 }}
    />
  );

  return (
    <ScreenContainer>
      <PageHeader
        title={i18n.t("myProfile")}
        sideActions={editing ? [CancelButton, SaveButton] : [EditButton]}
      />
      <UserProfile
        editable={editing}
        name={name}
        setName={setName}
        about={about}
        setAbout={setAbout}
        langs={langs}
        setLangs={setLangs}
      />
    </ScreenContainer>
  );
};
