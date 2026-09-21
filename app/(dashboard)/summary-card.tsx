import { ReactNode } from "react";

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-purple-500 bg-opacity-10 text-purple-700 sm:mb-3 sm:h-9 sm:w-9 md:h-10 md:w-10">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-xs font-medium text-slate-500 sm:text-sm md:text-base">
      {children}
    </p>
  );
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-lg font-semibold text-slate-900 sm:text-[18px] md:text-[26px]">
      {children}
    </p>
  );
};

export const SummaryCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="cardEnter relative top-4 mb-2 rounded-lg bg-purple-100 p-4 shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50 sm:top-6 sm:mb-3 sm:rounded-xl sm:p-5 md:top-8 md:mb-4 md:p-6">
      {children}
    </div>
  );
};
