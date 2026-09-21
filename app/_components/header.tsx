"use client";

import { Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

const Header = ({ title, onMenuClick }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-purple-500 px-4 py-4 md:hidden">
      <h1 className="text-[15.8px] font-bold text-white">{title}</h1>
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
        aria-label="Abrir menu"
        type="button"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu size={28} className="text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Header;
