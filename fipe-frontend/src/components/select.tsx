
import { classMerge } from "@/utils/mergeClass";
import { useEffect, useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";

type SelectVariant = 'default' | 'small' | 'smallUnactive';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    children: React.ReactNode;
    classNameOp?: string;
    placeholder?: string | number;
    onClear?: (e: React.MouseEvent) => void;
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

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        onClear?.(e)
    }

    const variantClasses = {
        default: ( 
            <> 

                { !isSelected &&
                    <select className={classMerge(` !bg-[#CFDDF4] p-2 text-sm w-full rounded cursor-pointer appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                        <option value={''} disabled className="text-black/50">{placeholder}</option>
                        {children}
                    </select>
                }
                { isSelected &&
                    <select disabled className={classMerge(` !bg-[#CFDDF4] p-2 text-sm w-full rounded cursor-pointer appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                        <option value={''} disabled className="text-black/50">{placeholder}</option>
                        {children}
                    </select>
                }


                <div className="absolute z-10 top-0 right-0 flex items-center justify-center w-10 h-full ">
                    <button onClick={handleClear}>
                        {isSelected ? (
                            <FiX className="cursor-pointer"></FiX>
                        ) :
                        (
                            <FiChevronDown className="text-lg cursor-pointer"></FiChevronDown> 
                        )}
                    </button>
                </div>
            </>
        ),
            
        small: ( 
     
            <>
                { !isSelected &&
                    <select className={classMerge(` !bg-[#ffff] pl-2 text-sm w-17 h-8  cursor-pointer rounded appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                        <option value={''} disabled className="text-black/50">{placeholder}</option>
                        {children}
                    </select>
                }
                { isSelected &&
                    <select disabled className={classMerge(` !bg-[#ffff] pl-2 text-sm w-17 h-8  cursor-pointer rounded appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                        <option value={''} disabled className="text-black/50">{placeholder}</option>
                        {children}
                    </select>
                }


                <div className="absolute z-10 top-0 right-0 flex items-center justify-center w-7 h-full ">
                    <button onClick={onClear}>
                        {isSelected ? (
                            <FiX className="cursor-pointer"></FiX>
                        ) :
                        (
                            <FiChevronDown className="text-lg cursor-pointer"></FiChevronDown> 
                        )}
                    </button>
                </div>
            </>
            ), 
          
    
        smallUnactive: (
            <>
            <select disabled className={classMerge(` !bg-[#CFDDF4] pl-2 text-sm w-10 h-8 rounded appearance-none ${value === '' ? "text-black/50" : "text-black"}`, classNameOp)}value={value}{...props} >
                <option value={''} disabled className="text-black/50">{placeholder}</option>
                {children}
            </select>
        </>
        )
    }

    return(
        

            <div className="relative">           
                {variantClasses[variant]}
            </div>

        )
   }


// if value != '', 