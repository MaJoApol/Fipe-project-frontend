
import { classMerge } from "@/utils/mergeClass";
import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

type SelectVariant = 'default' | 'small';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    children: React.ReactNode;
    classNameOp?: string;
    placeholder?: string | number;
    onClear?: () => void;
    variant?: SelectVariant;
}


export const Select: React.FC<SelectProps> = ({children, placeholder, classNameOp, value, variant= 'default', onClear, ...props}) => {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {

        if (value !== ''){
            setIsSelected(true)
        }
        else{
            setIsSelected(false)
        }
    }, [value, onClear])

    const variantClasses = {
        default: ( 
            <>
                <select className={classMerge(` !bg-[#CFDDF4] p-2 text-sm w-full rounded cursor-pointer appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                    <option value={''} disabled className="text-black/50">{placeholder}</option>
                    {children}
                </select>

                <div className="absolute z-10 top-0 right-0 flex items-center justify-center w-10 h-full ">
                    <button onClick={onClear}>
                        {isSelected ? (
                            <FiX className="cursor-pointer"></FiX>
                        ) :
                        (
                            <FiChevronDown className="text-lg"></FiChevronDown> 
                        )}
                    </button>
                </div>
            </>
        ),
            
        small: ( 
            <>
                <select className={classMerge(` !bg-[#ffff] pl-2 text-sm w-15 h-8  cursor-pointer rounded appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                    <option value={''} disabled className="text-black/50">{placeholder}</option>
                    {children}
                </select>
            </>
        )}

    return(
        <div className="relative">           
            {variantClasses[variant]}
        </div>

        )
   }


// if value != '', 