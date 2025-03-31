import React from "react"

type TitleType = 'title' | 'label' | 'warn' | 'caption' ;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement>{
    variant?: TitleType;
}

const Title: React.FC<TitleProps> = ({
    variant = 'label',
    className = '',
    children,
    ...props
}) => {

    const variantClasses = {
        title: 'text-4xl text-black font-semibold mt-4',
        label: 'text-md text-black font-semibold',
        warn: 'text-sm text-red-700',
        caption: 'text-xs text-gray-500'
    };

    return (
        <h1 className={`${variantClasses[variant]} ${className}`}{...props}>
            {children}
        </h1>
    );
};

export default Title;