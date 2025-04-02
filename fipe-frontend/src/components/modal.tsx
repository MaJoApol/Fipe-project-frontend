import IComponents from "@/interface/IComponents";


export default function Modal({children}: IComponents){
    return(
        <section className="fixed z-1 w-full h-full left-0 top-0 overflow-auto">
            <div className="bg-black/40 w-full h-full flex justify-center items-center">
                {children}
            </div>
        </section>
    )
}