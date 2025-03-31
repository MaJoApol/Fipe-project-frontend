import React from "react"

type InputVariant = 'solid' | 'disabled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    variant?: InputVariant;
    children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    variant = 'solid',
    children,
    className = '',  ...props}) => {

    //Base style
    const baseInput = 'flex-grow rounded font-medium box-border px-2 py-1 mb-2 placeholder:text-sm'

    const variantClasses = {
        solid: 'bg-[#CFDDF4] hover:bg-[#B2C6E7] focus:outline-0 text-black',
        disabled: 'bg-[#CFDDF4] opacity-60',
    };

    return (
        
        children ?  

        <div>
            <input
                className={`${baseInput} ${variantClasses[variant]} ${className}`}{...props}
            ></input>
            {children}
        </div> :
        <input
            className={`${baseInput} ${variantClasses[variant]} ${className}`}{...props}
        ></input>
    )
};

export default Input;