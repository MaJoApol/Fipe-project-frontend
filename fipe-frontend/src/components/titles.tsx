import React from "react"

type TitleType = 'title' | 'label' | 'warn' ;

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
        title: 'text-lg',
        label: 'text-md',
        warn: 'text-sm',
    };

    return (
        <h1 className={`${variantClasses[variant]} ${className}`}{...props}>
            {children}
        </h1>
    );
};

export default Title;