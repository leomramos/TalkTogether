import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import PageTitle from "./CustomText";
import NavigateBack from "./NavigateBack";

const HeaderWrapper = Styled.View`
  padding: 25px 0;
  padding-bottom: 15px;
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
  const { typography } = useTheme();

  return (
    <HeaderWrapper>
      <View style={{ flexDirection: "row", alignItems: "center", flexGap: 2 }}>
        {goBack && <NavigateBack action={goBack} />}
        <PageTitle type={typography.tab.title} style={{ marginRight: 15 }}>
          {title}
        </PageTitle>
        {titleExtra}
      </View>
      <View>{sideOptions.map(opt => opt)}</View>
    </HeaderWrapper>
  );
};
