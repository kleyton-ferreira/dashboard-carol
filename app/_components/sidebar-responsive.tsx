"use client";

import {
  LayoutGridIcon,
  PackageIcon,
  ShoppingBasketIcon,
  X,
} from "lucide-react";
import SidebarButton from "./ui/sidebar-button";
import Image from "next/image";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarResponsive = ({ isOpen = false, onClose }: SidebarProps) => {
  return (
    <div>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[320px] flex-col shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(-45deg, #bc91e4, #ebd8df, #f2ebfc, #D5F0E8)",
        }}
      >
        {/* Close Button */}
        <div className="group">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 rounded-lg p-2 transition-colors duration-300 hover:bg-purple-500"
            aria-label="Fechar menu"
            type="button"
          >
            <X
              size={24}
              className="text-slate-700 transition-colors duration-300 group-hover:text-white"
            />
          </button>
        </div>

        {/* Mobile Profile Section */}
        <div className="mb-6 flex items-center gap-3 px-6 pt-16">
          <div className="relative h-20 w-20">
            <div className="animate-rotate_border absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-gray-300"></div>
            <div className="absolute inset-2 flex items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/img.png"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-sm text-slate-600">
              Carol <strong className="font-bold">correia</strong>
            </h1>
            <p className="mt-1 text-xs text-slate-500">Bem-vinda de volta</p>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 pb-6">
          <SidebarButton href="/" onClick={onClose}>
            <LayoutGridIcon size={18} /> Inicio
          </SidebarButton>

          <SidebarButton href="/products" onClick={onClose}>
            <PackageIcon size={18} /> Clientes
          </SidebarButton>

          <SidebarButton href="/sales" onClick={onClose}>
            <ShoppingBasketIcon size={18} /> Serviços
          </SidebarButton>
        </nav>
      </div>
    </div>
  );
};

export default SidebarResponsive;
