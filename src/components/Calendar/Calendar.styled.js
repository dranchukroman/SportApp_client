import styled, { css } from "styled-components";
import theme from "../../styles/theme";

export const StyledFrame = styled.div`
    width: 100%;
    // border: 1px solid red;
    padding: 9px 0 15px 0;
`

export const TilesWrapper = styled.div`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: middle;
    margin-top: 7px;
`

export const ControllButtons = styled.div`
    width: 25px;
    height: 45px;
    display: flex;
    justify-content: ${($flexDirection) => $flexDirection ? `flex-${$flexDirection}` : 'center'};
    align-items: center;
`

export const TileElement = styled.div`
    width: ${({ $isToday }) => !$isToday ? '30px' : '34px'};
    height: ${({ $isToday }) => !$isToday ? '42px' : '46px'};
    color: ${theme.colors.whiteText};
    border-radius: 7px;

    ${({ $isToday }) =>
        !$isToday
            ? css`
                  border: 2px solid transparent;

                  background-image: linear-gradient(
                          ${theme.colors.darkBackground},
                          ${theme.colors.darkBackground}
                      ),
                      ${theme.colors.gradient};
                  background-origin: border-box;
                  background-clip: padding-box, border-box;
              `
            : css`
                  background-color: ${theme.colors.gradientBase};
                  background-image: ${theme.colors.gradient};
              `}


    box-shadow: ${theme.shadows.mainShadows};

    text-align: center;
`

export const WeekDayParagraph = styled.p`
    font-size: ${theme.fontSizes.smallParagraph};
    margin: 3px 0 0 0;
    line-height: 8.01px;
`

export const WeekDateParagraph = styled.p`
    font-size: ${theme.fontSizes.largeParagraph};
    margin: 8px 0 0 0;
    line-height: 10.01px;
`

export const ActiveTileDott = styled.div`
    width: 4px;
    height: 4px;
    margin: 6px auto 0 auto;
    border-radius: 50%;
    background-color: ${theme.colors.whiteText};
    opacity: ${({ $active }) => $active ? 1 : 0};
`