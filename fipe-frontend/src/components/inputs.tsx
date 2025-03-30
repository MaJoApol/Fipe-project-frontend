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
    const baseInput = 'rounded font-medium box-border px-2 py-1 w-194vh h-24vh'

    const variantClasses = {
        solid: 'bg-[#CFDDF4] text-white hover:bg-[#B2C6E7] focus:outline-0',
        disabled: 'bg-[#CFDDF4] text-white opacity-60',
    };

    return (

        <input
            className={`${baseInput} ${variantClasses[variant]} ${className}`}{...props}
        ></input>
    )
};

export default Input;