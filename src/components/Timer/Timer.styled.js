import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 356px;
    height: 100%;
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.5)
`;

export const TimeSelectors = styled.div`
    display: flex;
    justify-content: center;
    align-items: center
`;

export const ScrollList = styled.div`
    width: 75px;
    height: 57px;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    padding-top: 40px;
    padding-bottom: 40px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const ScrollItem = styled.div`
  font-size: 25px;
  line-height: 40px;
  scroll-snap-align: center;
  transition: color 0.3s ease;
  color: rgba(238, 238, 238, 0.5);

  &.active {
    color: ${theme.colors.whiteText};
    font-size: 57px;
    line-height: 55px;
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

export const DivideDots = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 20px;
`
export const Dot = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${theme.colors.whiteText}
`

