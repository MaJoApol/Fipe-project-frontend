import { classMerge } from "@/utils/mergeClass";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  classNameOp?: string;
}

export default function Container({ children, classNameOp }: ContainerProps) {
  return (
    <div className={classMerge("border-1 border-black/50 rounded-2xl", classNameOp)}>
      {children}
    </div>
  );
}