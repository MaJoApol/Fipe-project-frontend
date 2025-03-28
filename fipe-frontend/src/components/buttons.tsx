import { PlusIcon } from "@heroicons/react/20/solid";


type ButtonVariant = 'solid' | 'outline';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'solid',
    size = 'md',
    children,
    className = '',
    ...props
}) => {
    const buttonBase = 'rounded font-semibold'

    const variantClasses = {
        solid: 'bg-[#002265] hover:opacity-60',
        outline: 'box-border outline-1 outline-[#002265] text-[#002265] hover:opacity-60',
    }

    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
    }

    return(

        <button className={`${buttonBase} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}{...props}>
            {children}
        </button>
    )

}

export const AddButton = () => {
    return(
        <button className="rounded px-3 py-1 bg-[#002265] hover:opacity-60">
            <PlusIcon className="text-[#fff] w-7"/>
        </button>
    )
}


export default Button;