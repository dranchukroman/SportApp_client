import styled from 'styled-components';
import theme from '../../../../../styles/theme';
import Heading from '../../../../../components/Headings/Heading';

export const RecordTile = styled.div`
    width: 338px;
    padding: 5px 9px;
    margin-top: 14px;
    background-image: 
        linear-gradient(
            ${theme.colors.darkBackground}, 
            ${theme.colors.darkBackground}
            ), 
        ${theme.colors.gradient};
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: ${theme.shadows.mainShadows};

    color: ${theme.colors.whiteText};
    border: 2px solid transparent; /* Прозорі бордери */
    border-radius: 7px; /* Заокруглені кути */

`
export const TileHeading = styled(Heading)`
    padding: 10px;
    font-size: ${theme.fontSizes.largeParagraph};
`;
export const Record = styled.div`
    padding: 5px 0 5px 7px ;
    border-top: 2px solid ${theme.colors.gradientBase};
    font-size: ${theme.fontSizes.largeParagraph};
    display: flex;
    justify-content: space-between;
`
export const RecordInfo = styled.div`
    text-align: left;
`
export const RepsWeight = styled.div`
`
export const Note = styled.div`
    opacity: 0.7;
    font-size: ${theme.fontSizes.mediumParagraph}
`
export const Time = styled.div`
    margin-right: 7px;
    text-align: right;
    align-items: center;
    display: flex;
`