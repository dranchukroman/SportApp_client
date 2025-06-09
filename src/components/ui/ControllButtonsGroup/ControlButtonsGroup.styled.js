import styled from "styled-components";
import Button from "../../Buttons/Button";

export const ButtonsWrapper = styled.div`
    display: ${({ $isTwoButtons }) => ($isTwoButtons ? 'flex' : 'block')};
    justify-content: center;
    gap: 14px;
    margin-top: 10px;
`;

export const ControlButton = styled(Button)`
    flex: 1;
`