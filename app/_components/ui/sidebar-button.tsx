"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarButtonProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

const SidebarButton = ({ href, children, onClick }: SidebarButtonProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Fechar menu PRIMEIRO
    onClick?.();

    // Depois navegar
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-all duration-200 ${
        isActive
          ? "bg-purple-500 text-white shadow-md"
          : "text-slate-600 hover:text-purple-600"
      }`}
    >
      {children}
    </button>
  );
};

export default SidebarButton;
