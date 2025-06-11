import styled from "styled-components"
import Heading from "../../Headings/Heading";
import theme from "../../../styles/theme";

export const NoRecordsWrapper = styled.div`
`
export const EmptyStateHeading = styled(Heading)`
  padding: 30px 0 20px 0;
  font-size: ${theme.fontSizes.mediumHeader}
`;