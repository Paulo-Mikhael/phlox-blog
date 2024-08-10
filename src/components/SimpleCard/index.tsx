import { ReactNode } from "react";

export function SimpleCard({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="flex flex-col items-center py-5 px-[13px] bg-typo-100 shadow-xl shadow-typo-700/20 rounded-[10px]">
      <h2 className="text-section text-typo-700">
        {title}
      </h2>
      <div className="w-full bg-typo-200 h-[2px] my-[10px]" />
      <div className={`w-full gap-[10px] flex flex-col`}>
        {children}
      </div>
    </div>
  );
}