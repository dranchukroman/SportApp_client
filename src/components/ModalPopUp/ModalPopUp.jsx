import React from "react";
import { Overlay, PopUp, ButtonsWrapper } from './ModalPopUp.styled';
import theme from "../../styles/theme";

import Heading from "../Headings/Heading";
import Button from "../Buttons/Button";

function ModalPopUp({ modalParams }) {
    const renderButtons = () => {
        const buttons = [];

        Object.entries(modalParams).forEach(([key, value]) => {
            const match = key.match(/^btn(\d+)Text$/);

            if (match && value) {
                const index = match[1]; // отримаємо "1", "2", "3" і т.д.
                const text = value;
                const color = modalParams[`btn${index}Color`];
                const method = modalParams[`btn${index}Method`];

                buttons.push(
                    <Button
                        key={index}
                        bgColor={color}
                        onClick={method}
                    >
                        {text}
                    </Button>
                );
            }
        });

        return buttons;
    };

    return (
        <Overlay style={{ display: modalParams?.isVisible ? '' : "none" }}>
            <PopUp>
                <Heading fontSize={theme.fontSizes.mediumHeader}>
                    {modalParams?.mainText}
                </Heading>
                <ButtonsWrapper>
                    {renderButtons()}
                </ButtonsWrapper>
            </PopUp>
        </Overlay>
    );
}

export default ModalPopUp;
