"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useMobileMenu } from "../_hooks/useMobileMenu";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar isOpen={isOpen} onClose={close} />

      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <Header title={title} onMenuClick={toggle} />

        {/* Mostrado apenas em mobile, escondido em desktop */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-6 md:hidden">
          <h2 className="text-xl font-bold text-slate-800"></h2>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
