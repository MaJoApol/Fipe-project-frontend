import IComponents from "@/interface/IComponents";
import { classMerge } from "@/utils/mergeClass";
import React from "react";

export default function Container({ children, classNameOp }: IComponents) {
  return (
    <div className={classMerge("p-4 border-2 border-[#002265]/50 rounded-2xl", classNameOp)}>
      {children}
    </div>
  );
}