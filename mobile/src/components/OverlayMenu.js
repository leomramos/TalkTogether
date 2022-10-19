import React, { useState } from "react";
import { View } from "react-native";
import {
  IconButton,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "./CustomText";

const AnchorButton = Styled(IconButton)`
  margin: 0;
  margin-left: 5px;
  margin-right: -${({ screen }) => screen.padding.right};
`;

export default OverlayMenu = ({
  title = "",
  icon = "",
  iconSize = 30,
  content = <></>,
  footer = "",
  topSpacing = 50,
  footerAction = () => {},
}) => {
  const { colors, typography, screen } = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      style={{
        marginTop: topSpacing,
      }}
      contentStyle={{ backgroundColor: colors.gray.third }}
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <AnchorButton
          icon={icon}
          color={visible ? colors.gray.ninth : colors.gray.seventh}
          size={iconSize}
          onPress={openMenu}
          screen={screen}
        />
      }
    >
      <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
        <CustomText type={typography.overlay.title} color={colors.gray.ninth}>
          {title}
        </CustomText>
        <View
          style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
        >
          {content}
        </View>
        {footer && (
          <TouchableRipple
            centered
            onPress={footerAction}
            style={{ alignSelf: "flex-end", padding: 5 }}
          >
            <CustomText
              type={typography.overlay.footer}
              color={colors.gray.eigth}
            >
              {footer}
            </CustomText>
          </TouchableRipple>
        )}
      </View>
    </Menu>
  );
};
