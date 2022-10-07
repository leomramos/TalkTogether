import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import PageTitle from "./CustomText";

const HeaderWrapper = Styled.View`
  padding: 25px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default PageHeader = ({
  goBack = false,
  title = "",
  titleExtra = <></>,
  sideOptions = [],
}) => {
  const { text } = useTheme();

  return (
    <HeaderWrapper>
      <View>
        {goBack && <Text>GB</Text>}
        <PageTitle base={text.pageTitle}>{title}</PageTitle>
        {titleExtra}
      </View>
      <View>
        {sideOptions.map(opt => opt)}
        <Text>a</Text>
      </View>
    </HeaderWrapper>
  );
};
