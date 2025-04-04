
import { classMerge } from "@/utils/mergeClass";
import { useEffect, useState } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    children: React.ReactNode;
    classNameOp?: string;
    placeholder?: string;
}


export const Select: React.FC<SelectProps> = ({children, placeholder, classNameOp, value, ...props}) => {
    const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true);
    useEffect(() => {
        setIsPlaceholderSelected(!value);
      }, [value]);

    return(
        <select className={classMerge(`!bg-[#CFDDF4] p-2 text-sm rounded appearance-none bg-[url('/chevron-down.svg')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.2rem_1.2rem] [&>option:not(:first-child)]:text-black ${isPlaceholderSelected ? "text-black/50" : "text-black"}`, classNameOp)}{...props} >
            <option value={''} className="text-black/50">{placeholder}</option>
            {children}
        </select>
    )
}
