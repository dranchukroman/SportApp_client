import React from "react";
import { Overlay, PopUp, ButtonsWrapper } from './ModalPopUp.styled';
import theme from "../../../styles/theme";

import Heading from "../../Headings/Heading";
import Button from "../../Buttons/Button";

function ModalPopUp({ modalParams }) {
    return (
        <Overlay style={{display: modalParams?.isVisible ? 'fixed' : "none"}}>
            <PopUp>
                <Heading fontSize={theme.fontSizes.mediumHeader}>
                    {modalParams?.mainText}
                </Heading>
                <ButtonsWrapper>
                    {modalParams?.btn1Text
                        ? <Button
                            bgColor={modalParams?.btn1Color}
                            onClick={modalParams?.btn1Method}
                        >
                            {modalParams?.btn1Text}
                        </Button>
                        : null}
                    {modalParams?.btn2Text
                        ? <Button
                            bgColor={modalParams?.btn2Color}
                            onClick={modalParams?.btn2Method}
                        >
                            {modalParams?.btn2Text}
                        </Button>
                        : null}
                    {modalParams?.btn3Text
                        ? <Button
                            bgColor={modalParams?.btn3Color}
                            onClick={modalParams?.btn3Method}
                        >
                            {modalParams?.btn3Text}
                        </Button>
                        : null}
                </ButtonsWrapper>
            </PopUp>
        </Overlay>
    )
}

export default ModalPopUp;