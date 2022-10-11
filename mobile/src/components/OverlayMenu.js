import React, { useState } from "react";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";

export default OverlayMenu = ({ action }) => {
  const { colors, text } = useTheme();
  const iconSize = 20;
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      style={{ marginTop: iconSize * 2 }}
      contentStyle={{ backgroundColor: colors.surface }}
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          icon="cog"
          color={visible ? text.icons.active : text.icons.idle}
          size={iconSize}
          onPress={openMenu}
          style={{ margin: 0 }}
        />
      }
    >
      <Menu.Item onPress={() => {}} title="Item 1" />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Divider />
      <Menu.Item onPress={() => {}} title="Item 3" />
    </Menu>
  );
};
