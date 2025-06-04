import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    position: absolute;
    top: 104px;
    width: 360px;
    height: 450px;
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
`;

export const TimeSelectors = styled.div`
    display: flex;
    justify-content: center;
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
    color: white;
    font-size: 57px;
    line-height: 55px;
  }
`;

export const TimeLeft = styled.div`
  font-size: 36px;
  margin: 20px 0;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;