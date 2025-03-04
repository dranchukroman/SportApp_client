import React from "react";
import { StyledInput } from './Input.styled';

function Input({placeholder = 'Set placeholder', style, type, value, onChange}){
    return (
        <div>
            <StyledInput 
                placeholder={placeholder} 
                style={style}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;