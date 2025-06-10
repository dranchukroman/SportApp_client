import React from "react";
import { CheckBoxWrapper } from './CheckBox.styled';
import { ReactComponent as CheckMark } from '../../../assets/icons/check-mark.svg'

function CheckBox({ onClick, active = false, className }) {
    // Обробник для клавіатури (дозволяє активувати пробілом)
    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); // Запобігаємо прокрутці сторінки
            onClick();
        }
    };

    return (
        <CheckBoxWrapper
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="checkbox"
            aria-checked={active}
            tabIndex="0"
        >
            {active && <CheckMark />}
        </CheckBoxWrapper>
    );
}

export default CheckBox;