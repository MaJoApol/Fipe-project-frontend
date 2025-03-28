import React from "react"

type InputVariant = 'solid' | 'disabled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    variant?: InputVariant;
    children: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    variant = 'solid',
    children,
    className = '',  ...props}) => {

    //Base style
    const baseInput = 'rounded font-medium'

    const variantClasses = {
        solid: 'bg-[#CFDDF4] text-white hover:bg-[#B2C6E7]',
        disabled: 'bg-[#CFDDF4] text-white opacity-60',
    };

    return (

        <input
            className={`${baseInput} ${variantClasses[variant]} ${className}`}{...props}
        ></input>
    )
};

export default Input;