import React from "react";
import { StyledInput } from './Input.styled';

function Input({ placeholder = 'Set placeholder', style, type, value, onChange, className }) {
    return (
        <StyledInput
            className={className}
            placeholder={placeholder}
            style={style}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
}

export default Input;