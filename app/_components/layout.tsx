"use client";

import { ReactNode } from "react";
import Header from "./header";
import { useMobileMenu } from "../_hooks/useMobileMenu";
import SidebarResponsive from "./sidebar-responsive";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { isOpen, toggle, close } = useMobileMenu();
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "/dashboard";

  const isServicesPage =
    pathname.includes("/sales") || pathname.includes("/sales");

  const headerTitle = isHomePage
    ? "Faturamentos & Atendimentos"
    : isServicesPage
      ? "Serviços concluidos"
      : title;

  return (
    <div className="flex h-screen w-full">
      <SidebarResponsive isOpen={isOpen} onClose={close} />

      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <Header title={headerTitle} onMenuClick={toggle} />

        {/* Mostrado apenas em mobile, escondido em desktop */}
        <div className="flex items-center justify-between border-b px-1 py-3 md:hidden">
          <h2 className="text-xl font-bold text-slate-800"></h2>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
