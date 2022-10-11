import React, { useState } from "react";
import { View } from "react-native";
import {
  IconButton,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import CustomText from "./CustomText";

export default OverlayMenu = ({
  title = "",
  icon = "",
  iconSize = 30,
  content = <></>,
  footer = "",
  topSpacing = 50,
  footerAction = "",
}) => {
  const { colors, text } = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      style={{
        marginTop: topSpacing,
      }}
      contentStyle={{ backgroundColor: colors.surface }}
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          icon={icon}
          color={visible ? text.icons.active : text.icons.idle}
          size={iconSize}
          onPress={openMenu}
          style={{ marginVertical: 0, marginLeft: 5, marginRight: -15 }}
        />
      }
    >
      <CustomText
        type={text.overlayTitle}
        style={{ paddingHorizontal: 15, paddingVertical: 5 }}
      >
        {title}
      </CustomText>
      <View style={{ marginTop: 5, flexDirection: "row" }}>{content}</View>
      {footer && (
        <TouchableRipple
          centered
          onPress={() => {}}
          style={{ alignSelf: "flex-end" }}
        >
          <CustomText
            type={text.overlayFooter}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
            }}
          >
            {footer}
          </CustomText>
        </TouchableRipple>
      )}
    </Menu>
  );
};
