
import { classMerge } from "@/utils/mergeClass";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    children: React.ReactNode;
    classNameOp?: string
}


export default function Select({children, classNameOp}: SelectProps){
    return(
        <select className={classMerge("bg-[#CFDDF4] p-1 rounded ", classNameOp)} >
            {children}
        </select>
    )
}