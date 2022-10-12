import { Text, View } from "react-native";
import { Divider } from "react-native-paper";
import Styled from "styled-components/native";
import UserAvatar from "./UserAvatar";

const ItemContainer = Styled.View`
  flex-direction: row;
`;

export const ChatItem = ({ name }) => {
  return (
    <ItemContainer>
      <View>
        <UserAvatar />
      </View>
      <View>
        <Text>2 {name}</Text>
        <Divider />
      </View>
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
