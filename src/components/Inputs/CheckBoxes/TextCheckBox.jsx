import React from 'react';
import { TextCheckboxWrapper } from './CheckBox.styled';

function TextCheckBox({ isActive = false, children, onClick }) {
    return (
        <TextCheckboxWrapper
            isActive={isActive}
            onClick={onClick}
        >
            {children}
        </TextCheckboxWrapper>
    );
}

export default TextCheckBox;