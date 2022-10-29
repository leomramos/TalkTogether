import React from "react";
import { useTheme } from "react-native-paper";
import Styled from "styled-components/native";
import PageTitle from "./CustomText";
import { Row } from "./Helpers";
import NavigateBack from "./NavigateBack";

const HeaderWrapper = Styled(Row)`
  padding: 25px 0;
  padding-bottom: 15px;
  width: 100%;
  justify-content: space-between;
`;

export default PageHeader = ({
  goBack = false,
  title = "",
  titleExtra = null,
  sideActions = [],
}) => {
  const { colors, typography } = useTheme();

  return (
    <HeaderWrapper>
      <Row>
        {goBack && <NavigateBack action={goBack} />}
        <PageTitle
          type={typography.tab.title}
          color={colors.gray.ninth}
          style={{ marginRight: 5 }}
        >
          {title}
        </PageTitle>
        {titleExtra}
      </Row>
      <Row style={{ marginRight: 10 }}>
        {sideActions.map((Action, i) => (
          <Action key={i} />
        ))}
      </Row>
    </HeaderWrapper>
  );
};
