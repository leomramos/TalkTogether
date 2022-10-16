import { Text, View } from "react-native";
import { Divider, TouchableRipple, useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import CustomText from "./CustomText";
import UserAvatar from "./UserAvatar";

const ItemContainer = Styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

const ChatInfo = Styled.View`
  flex: 1;
`;

const MessageWrapper = Styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Badge = Styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
`;

export const ChatItem = ({ name }) => {
  const { colors, typography } = useTheme();
  return (
    <ItemContainer>
      <UserAvatar />
      <ChatInfo>
        <MessageWrapper>
          <CustomText type={typography.label.name} color={colors.gray.eigth}>
            {name}
          </CustomText>
          <CustomText type={typography.label.sent} color={colors.gray.seventh}>
            just now
          </CustomText>
        </MessageWrapper>
        <MessageWrapper style={{ marginTop: 4 }}>
          <CustomText
            type={typography.message.preview}
            color={colors.gray.eigth}
            style={{ flex: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Ullamco ad sit voluptate occaecat enim aliqua sint dolor voluptate
            cupidatat. Est sit ipsum minim aliquip fugiat nostrud adipisicing.
            Sunt dolor cupidatat excepteur ea non. Ipsum quis deserunt cupidatat
            consectetur minim occaecat occaecat aliquip aute. Cillum deserunt
            sunt aliqua non fugiat ut consequat eu amet quis dolore. Esse
            commodo dolor non exercitation nulla labore do dolore tempor
            consectetur nulla ad et quis. Minim culpa duis anim officia.
          </CustomText>
          <Badge size={16} color={colors.purple.eighth}>
            <CustomText
              type={typography.message.badge}
              color={colors.gray.second}
            >
              9+
            </CustomText>
          </Badge>
        </MessageWrapper>
        <Divider
          style={{ marginTop: 15, backgroundColor: colors.gray.fifth }}
        />
      </ChatInfo>
    </ItemContainer>
  );
};

export const CallItem = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default List = Styled.FlatList`
  margin-top: 30px;
  padding-right: ${({ theme }) => theme.screen.padding.right};
  margin-right: -${({ theme }) => theme.screen.padding.right};
`;
