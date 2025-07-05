import React from "react";
import { StyledInput } from './Input.styled';

function Input({ placeholder = 'Set placeholder', style, type, value, onChange, className, onBlur, name }) {
    return (
        <StyledInput
            className={className}
            placeholder={placeholder}
            style={style}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
        />
    );
}

export default Input;