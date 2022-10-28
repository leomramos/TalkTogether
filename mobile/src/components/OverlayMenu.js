import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  IconButton,
  Menu,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Styled from "styled-components/native";
import Badge from "./Badge";
import CustomText from "./CustomText";
import { Row } from "./Helpers";

const AnchorView = Styled.View`
  position: relative;
`;

export default OverlayMenu = ({
  title = "",
  icon = "",
  iconSize = 30,
  content = <></>,
  footer = "",
  topSpacing = 50,
  footerAction = () => {},
  badge = 0,
  iconColor = "",
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
        <AnchorView>
          <IconButton
            icon={icon}
            color={
              visible ? colors.gray.ninth : iconColor || colors.gray.seventh
            }
            size={iconSize}
            onPress={openMenu}
            style={{ margin: 0 }}
          />
          {badge ? (
            <Badge
              size={10}
              color={colors.gray.seventh}
              style={{
                position: "absolute",
                top: iconSize * 0.5 - 7,
                right: iconSize * 0.5 - 7,
              }}
            >
              <CustomText
                type={typography.menus.badge}
                color={colors.gray.ninth}
              >
                {badge}
              </CustomText>
            </Badge>
          ) : (
            <></>
          )}
        </AnchorView>
      }
    >
      <View style={{ paddingHorizontal: 15, paddingTop: 5 }}>
        <CustomText type={typography.overlay.title} color={colors.gray.ninth}>
          {title}
        </CustomText>
        <Row style={{ marginTop: 10, marginBottom: 5 }}>{content}</Row>
        {footer && (
          <TouchableRipple
            centered
            onPress={footerAction}
            style={{ alignSelf: "flex-end", padding: 5 }}
          >
            <CustomText
              type={typography.overlay.footer}
              color={colors.gray.eighth}
            >
              {footer}
            </CustomText>
          </TouchableRipple>
        )}
      </View>
    </Menu>
  );
};
