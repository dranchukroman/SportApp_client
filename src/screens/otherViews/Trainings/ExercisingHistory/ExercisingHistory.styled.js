import styled from 'styled-components';
import theme from '..//../../../styles/theme';

export const HistoryWrapper = styled.div`

`
export const HistoryRecord = styled.div`
    font-size: ${theme.fontSizes.largeParagraph};
    padding: 5px 0 5px 7px ;
    margin: 0;
    border-top: 2px solid ${theme.colors.gradientBase};
`

export const TileWrapper = styled.div`
    margin-top: 14px;
`

export const RecordTile = styled.div`
    width: 338px;
    padding: 5px 9px;
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

    ${HistoryRecord}:first-child{
        border: none;
    }
`
export const HistoryRecordWrapper = styled.div``

export const RecordGroup = styled.div`
    width: 100%;
    height: 100%;
`
export const RecordInfo = styled.div`
    text-align: left;
`
export const RecordDate = styled.div`
    text-align: right;
    align-items: center;
    display: flex;
`
