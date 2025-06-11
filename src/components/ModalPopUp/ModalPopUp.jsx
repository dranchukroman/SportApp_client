import React from "react";
import { Overlay, PopUp, ButtonsWrapper, ModalHeading } from './ModalPopUp.styled';
import Button from "../Buttons/Button";
import { useModal } from "../../providers/ModalProvider";

function ModalPopUp() {
    const { modalConfig, hideModal } = useModal();

    if (!modalConfig?.isVisible) {
        return null;
    }

    const handleOverlayClick = () => {
        hideModal();
    }

    const handlePopUpClick = (e) => e.stopPropagation();

    return (
        <Overlay onClick={handleOverlayClick}>
            <PopUp onClick={handlePopUpClick}>
                <ModalHeading>
                    {modalConfig.mainText}
                </ModalHeading>
                <ButtonsWrapper>
                    {modalConfig.buttons?.map((button, index) => (
                        <Button
                            key={button.text || index}
                            bgColor={button.color}
                            onClick={button.onClick}
                        >
                            {button.text}
                        </Button>
                    ))}
                </ButtonsWrapper>
            </PopUp>
        </Overlay>
    );
}

export default ModalPopUp;
