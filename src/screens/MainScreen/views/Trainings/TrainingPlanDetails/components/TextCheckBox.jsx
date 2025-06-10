import React from 'react';
import { TextCheckboxWrapper } from '../TrainingPlanDetails.styled';

function TextCheckBox({ isActive = false, children, onClick }) {
    return (
        <TextCheckboxWrapper
            $isActive={isActive}
            onClick={onClick}
        >
            {children}
        </TextCheckboxWrapper>
    );
}

export default TextCheckBox;