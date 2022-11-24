import { useKeyboard } from "@react-native-community/hooks";
import { useEffect, useState } from "react";
import { IconButton, useTheme } from "react-native-paper";
import { PageHeader, ScreenContainer } from "../../components/";
import { UserProfile } from "../mocks";

import i18n from "../../i18n";

export default MyProfile = ({ navigation }) => {
  const keyboard = useKeyboard();

  useEffect(
    _ =>
      keyboard.keyboardShown
        ? navigation.setOptions({
            tabBarStyle: { ...navigation.tabBarStyle, display: "none" },
          })
        : navigation.setOptions({
            tabBarStyle: {
              backgroundColor: colors.gray.first,
              paddingVertical: 5,
              display: "flex",
            },
          }),
    [keyboard.keyboardShown]
  );

  const { colors } = useTheme();

  const [editing, setEditing] = useState(false);
  const [editingPic, setEditingPic] = useState(false);
  const [savable, setSavable] = useState(true);

  const [curAvatar, setCurAvatar] = useState(null);
  const [avatar, setAvatar] = useState(curAvatar);

  const [curAvatarColor, setCurAvatarColor] = useState(colors.avatar.white);
  const [avatarColor, setAvatarColor] = useState(curAvatarColor);

  const [curName, setCurName] = useState("User");
  const [name, setName] = useState(curName);

  const [curAbout, setCurAbout] = useState(
    "Elit eiusmod in incididunt laboris consectetur ullamco et quis quis. Consectetur aliqua veniam anim nisi sunt ipsum sint do sunt. Eiusmod cupidatat reprehenderit minim do minim consectetur labore eiusmod magna consectetur velit aute laboris ullamco."
  );
  const [about, setAbout] = useState(curAbout);

  const [curLangs, setCurLangs] = useState({
    native: ["Portuguese"],
    advanced: ["English"],
    intermediate: ["Spanish"],
    beginner: [
      "Italian",
      "French",
      "Russian",
      "German",
      "Indonesian",
      "Chinese",
      "Japanese",
      "Korean",
    ],
  });
  const [langs, setLangs] = useState(curLangs);

  const handleSave = _ => {
    setCurName(name);
    setCurAbout(about);
    setCurLangs(langs);
    setCurAvatar(avatar);
    setCurAvatarColor(avatarColor);
    setEditing(false);
    setEditingPic(false);
  };

  const handleCancel = _ => {
    setName(curName);
    setAbout(curAbout);
    setLangs(curLangs);
    setAvatar(curAvatar);
    setAvatarColor(curAvatarColor);
    setEditing(false);
    setEditingPic(false);
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
      disabled={!savable}
      style={{ marginVertical: 0, opacity: savable ? 1 : 0.4 }}
    />
  );

  const CancelButton = _ => (
    <IconButton
      icon="close"
      color={colors.aux.cancel}
      onPress={handleCancel}
      disabled={!savable}
      style={{ margin: 0, opacity: savable ? 1 : 0.4 }}
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
        avatar={avatar}
        setAvatar={setAvatar}
        avatarColor={avatarColor}
        setAvatarColor={setAvatarColor}
        name={name}
        setName={setName}
        about={about}
        setAbout={setAbout}
        langs={langs}
        setLangs={setLangs}
        editingPic={editingPic}
        setEditingPic={setEditingPic}
      />
    </ScreenContainer>
  );
};
